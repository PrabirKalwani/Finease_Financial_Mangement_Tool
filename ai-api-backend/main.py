from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  


load_dotenv()


api_key = os.getenv("API_KEY")


if api_key:
    genai.configure(api_key=api_key)
else:
    raise ValueError("API_KEY not found in environment variables")

card_title = "Return on Investment"
card_desc = "Return on investment (ROI) is a performance measure used to evaluate the efficiency of an investment or compare the efficiency of several investments."

sys_prompt = f"""
You are a financial analyst bot, that helps users understand the financial term -{card_title}, using very basic scenarios and analogies.
definition of {card_title} is: {card_desc}
Use as simple analogies as possible to explain the context.
Keep the response as short and simple as possible.

Rules:
1. Response should be Small.(3-4 lines at maximum)
2. Talk professionally.
3. At the end, explain how the analogy highlights the given term.
4. Try to keep the conversation around {card_title}
"""

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


model = genai.GenerativeModel("gemini-1.5-flash")


conversation_history = []

@app.route("/generate", methods=["POST"])
def generate_response():
    try:
        
        data = request.get_json()
        user_input = data.get("user_input", "")
        budget_amt = data.get("budget_amt", 100000)
        budget_type = data.get("budget_type", "Medium")
        risk_apetite = data.get("risk_apetite", "High")

        if not user_input:
            return jsonify({"error": "User input is required."}), 400

        
        sys_prompt = sys_prompt_template.format(
            budget_amt=budget_amt, budget_type=budget_type, risk_apetite=risk_apetite
        )

        
        conversation_history.append(f"You: {user_input}")
        
        
        prompt = "\n".join(conversation_history) + "\n" + sys_prompt

        
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                max_output_tokens=1000,
                temperature=0.7,
            )
        )

        
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


@app.route('/aayush-generate', methods=['POST'])
def aayush_generate():
    user_input = request.json.get('input')

    if user_input:
        conversation_history.append(f"You: {user_input}")

        try:
            response = model.generate_content(
                "\n".join(conversation_history), 
                generation_config=genai.GenerationConfig(
                    max_output_tokens=1000,
                    temperature=0.8,  
                )
            )

            ai_response = response.text.strip() if hasattr(response, 'text') else "Error: No valid response text received."

            conversation_history.append(f"AI: {ai_response}")

            return jsonify({"response": ai_response})

        except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    else:
        return jsonify({"error": "Invalid input, please provide a valid message."}), 400







if __name__ == "__main__":
    app.run(debug=True ,port=1234,host="0.0.0.0")
