const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

// Firestore imports
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} = require("firebase/firestore");
const auth = getAuth();
const db = getFirestore();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(auth.currentUser);

      // Add user to Firestore with the specified structure
      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(userRef, {
        accountNumber: 0,
        uid: user.uid,
        email: user.email,
        salary: 0,
        riskAppetite: "low",
      });

      // Create sub-collections: `Transaction` and `Simtrade`
      const transactionsRef = collection(userRef, "Transaction");
      const simtradeRef = collection(userRef, "Simtrade");

      // Initialize documents in `Transaction` sub-collection
      await setDoc(doc(transactionsRef), {
        amount: 0,
        secondAccount: "",
        transactionId: "",
        type: "",
        timestamp: new Date().toISOString(),
      });

      // Initialize documents in `Simtrade` sub-collection
      await setDoc(doc(simtradeRef), {
        buy: 0,
        sell: 0,
        tickevalue: 0,
      });

      res.status(201).json({
        message: "Verification email sent! User created successfully!",
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = userCredential._tokenResponse.idToken;
      if (idToken) {
        res.cookie("access_token", idToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: "User logged in successfully", userCredential });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    }
  }

  // Logout and other methods remain unchanged
  async logoutUser(req, res) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return res
          .status(400)
          .json({ message: "No user is currently logged in" });
      }

      await signOut(auth);
      res.clearCookie("access_token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: "Email is required",
      });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      res
        .status(200)
        .json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async checkUserDetailsByEmail(req, res) {
    try {
      // Retrieve email from request
      const { email } = req.query; // Pass email as a query parameter
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Query Firestore for the user document based on email
      const usersCollection = collection(db, "users");
      const emailQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (querySnapshot.empty) {
        return res.status(404).json({ error: "User not found" });
      }

      // Assume email is unique, so fetch the first result
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Extract required details
      const { accountNumber, riskAppetite, salary } = userData;

      // Construct response
      const response = {
        accountNumber,
        riskAppetite,
        salary,
        status: "Details retrieved successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while checking user details" });
    }
  }

  async updateUserDetails(req, res) {
    try {
      // Retrieve email and new values from request body
      const { email, accountNumber, riskAppetite, salary } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Query Firestore for the user document based on email
      const usersCollection = collection(db, "users");
      const emailQuery = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (querySnapshot.empty) {
        return res.status(404).json({ error: "User not found" });
      }

      // Assume email is unique, so fetch the first result
      const userDoc = querySnapshot.docs[0];
      const userRef = userDoc.ref;

      // Prepare updated data
      const updatedData = {};
      if (accountNumber !== undefined)
        updatedData.accountNumber = accountNumber;
      if (riskAppetite !== undefined) updatedData.riskAppetite = riskAppetite;
      if (salary !== undefined) updatedData.salary = salary;

      // Update the document in Firestore
      await updateDoc(userRef, updatedData);

      res.status(200).json({
        message: "User details updated successfully",
        updatedData,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating user details" });
    }
  }
}

module.exports = new FirebaseAuthController();
