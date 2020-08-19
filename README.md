# Pandemic Phone Line
An automated phone line that processes food orders through speech to text and natural language understanding.

### Getting Started
1. Clone the repo
`git clone https://github.com/alif-munim/pandemic-phone-line.git`
1. Install the required dependencies:
`npm install`
1. Process the sample audio file:
`node processAudio.js daniel-order.mp3`

### Creating Your Own Audio File
Below is the speech format that works best. For now, you'll have to act as both the operator and customer. The ellipses [...] signify a pause in speech.
> "Hi, please provide your full name... **[full name]**... please provide your order... **[order, with quantities]**... please provide your address... **[house number x on y street, city, province, country]**"