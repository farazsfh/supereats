# Pandemic Phone Line
An automated phone line that processes food orders through speech to text and natural language understanding.
<br/><br/>

### 🏁 Getting Started
1. Clone the repo
`git clone https://github.com/alif-munim/pandemic-phone-line.git`
1. Install the required dependencies:
`npm install`
1. Process the sample audio file:
`node processAudio.js daniel-order.mp3`
<br/>

### 🔉 Creating Your Own Audio File
Below is the speech format that works best. For now, you'll have to act as both the operator and customer. The ellipses [...] signify a pause in speech.
> "Hi, please provide your full name... **[full name]**... please provide your order... **[order, with quantities]**... please provide your address... **[house number x on y street, city, province, country]**"
<br/>

### 💬 Testing the NLU Model
1. Create a sample text file following the above audio file format and save it in your local repository.
1. Run the following command and pass your text file as an argument:
    `node nlu.js [text-file]`
<br/>

### 🎙 Testing Speech To Text
1. Create a sample audio file and upload it to a downloadable url
1. Run the following command and pass your url as an argument:
    `node stt.js [url]`
