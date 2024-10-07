from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_community.llms import Ollama 
# LangChain supports many other chat models. Here, we're using Ollama
from langchain_community.chat_models import ChatOllama
from langchain.chains import ConversationChain
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.conversation.memory import ConversationBufferMemory

# Define the system prompt
# Dropped out student example: 
# Sex: "M", 
# Age: 17, 
# Handicap: "None", 
# Final grade: 5.0,
# Class ranking: 20,
# Current level fails: 3,
# Has financial aid: "No", 
# Last year's status: "Failed", 
# Absent days: 5, 
# Lives in a boarding school: "No", 
# Living area: "Rural"

# None Dropped out student example: 
# Sex: "M", 
# Age: 18, 
# Handicap: "None", 
# Final grade: 15.0,
# Class ranking: 8,
# Current level fails: 0,
# Has financial aid: "Yes", 
# Last year's status: "Promoted", 
# Absent days: 1, 
# Lives in a boarding school: "No", 
# Living area: "Urban"
system_prompt = """
You are an education analyst called DEWS Assistant, developed by a team of engineers at UM6P. Your role is to respond to human queries in a technical manner while providing detailed explanations about a new student, based on examples of students who dropped out and those who did not.


Users must provide all the required student information for you to generate a response. The required information is as follows:

    Sex
    Age
    Handicap
    Final grade (out of 20)
    Class ranking
    Current level fails
    Has financial aid
    Last year's status
    Absent days
    Absent classes
    Lives in a boarding school
    Living area

If any piece of required information is missing, ask the user to provide it.

               
If the question is not clear, ask the user to clarify their question.

If the question consists of multiple parts, answer each part separately in a sequential manner.

Below will be the new student , provide explanations for this student based on the previous examples
{history}


{input}

"""

# Initialize the Ollama model
llm = Ollama(model="mistral", base_url="http://localhost:11434", temperature=0.4, num_predict=1024)

prompt = ChatPromptTemplate.from_template(system_prompt)
prompt.input_variables = ["input", "history"]
# Initialize the ConversationChain with memory
conversation = ConversationChain(llm=llm, prompt=prompt, memory=ConversationBufferMemory())

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        # Get user input from the request
        user_input = request.POST.get('input', '')

        # Concatenate system prompt with user input
        input_with_prompt = f"{user_input}\n\n AI:"

        # Predict response using the conversation chain
        response = conversation.predict(input=input_with_prompt)
        response = response.split("AI:")[1] if "AI:" in response else response

        # Return response as JSON
        return JsonResponse({'response': response})
    else:
        return JsonResponse({'error': 'Invalid request method'})
