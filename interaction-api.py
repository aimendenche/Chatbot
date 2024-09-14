def get_response(prompt):
    response = openai.ChatCompletion.create(
        model="text-embedding-3-small",
        messages=[
            {"role": "system", "content": "Tu es un assistant amical."},
            {"role": "user", "content": prompt},
        ]
    )
    return response['choices'][0]['message']['content']

while True:
    user_input = input("Tu: ")
    if user_input.lower() == "exit":
        break
    bot_response = get_response(user_input)
    print(f"Chatbot: {bot_response}")
