from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment variable
api_key = os.getenv("API_KEY")

# Configure Generative AI API
if api_key:
    genai.configure(api_key=api_key)
else:
    raise ValueError("API_KEY not found in environment variables")

sys_prompt_template = """
You are a financial portfolio building chatbot, that suggests users where to invest their money.
The user is willing to invest in {risk_apetite} risk investments, and has a {budget_type} budget
of Rs. {budget_amt}. Based on this, suggest how can the user divide their money (IN PERCENTAGE AND VALUE).
The investment types you can choose from are:
1. Stocks (longterm for medium risk, intraday for high risk)
2. Mutual Funds (low risk, high budget)
3. Fixed Deposits (low risk, low/medium budget)
4. Recurring Deposits (low risk, medium/high budget )
5. IPOs (High risk, high budget)

Rules:
1. Response should be AS SMALL AS POSSIBLE.
2. Response MUST BE IN POINTERS.
3. Talk like a financial advisor.
4. ONLY WHERE TO INVEST SHOULD BE IN RESPONSE AND EXPLAIN WHY TO INVEST IN THAT.
"""

# Create generative model
model = genai.GenerativeModel("gemini-1.5-flash")

# Store conversation history
conversation_history = []

@app.route("/generate", methods=["POST"])
def generate_response():
    try:
        # Get user input and preferences from request
        data = request.get_json()
        user_input = data.get("user_input", "")
        budget_amt = data.get("budget_amt", 100000)
        budget_type = data.get("budget_type", "Medium")
        risk_apetite = data.get("risk_apetite", "High")

        if not user_input:
            return jsonify({"error": "User input is required."}), 400

        # Generate system prompt with user preferences
        sys_prompt = sys_prompt_template.format(
            budget_amt=budget_amt, budget_type=budget_type, risk_apetite=risk_apetite
        )

        # Update conversation history
        conversation_history.append(f"You: {user_input}")
        
        # Pass the full prompt (combining history and system instructions) to the model
        prompt = "\n".join(conversation_history) + "\n" + sys_prompt

        # Generate response
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                max_output_tokens=1000,
                temperature=0.7,
            )
        )

        # Extract AI response
        if hasattr(response, 'text') and response.text:
            ai_response = response.text.strip()
            conversation_history.append(f"AI: {ai_response}")
            return jsonify({"response": ai_response})
        else:
            return jsonify({"error": "No valid response text received."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/reset", methods=["POST"])
def reset_conversation():
    """Endpoint to reset the conversation history."""
    global conversation_history
    conversation_history = []
    return jsonify({"message": "Conversation history reset."})

if __name__ == "__main__":
    app.run(debug=True ,port=1234,host="0.0.0.0")
