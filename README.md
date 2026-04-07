# VerifyAI
Before an AI model is launched, it goes through a period of training, which utilizes information across the internet to prepare its answers for any questions the user might ask. During this period, different AI models could use completely different sources, including training poisoning, where people provide false information to the AI. This leads to AI outputs such as "this mushroom is not poisonous" because a couple of articles state so.
Our solution is to utilize multiple major AI models. A model identifies sensitive words such as medicine, poisonous, effects on the human body, and potential self-harm. Once our model detects those words, it will run through the intersection of answers across multiple AI platforms and compare them side by side to ensure reliability. The user will be informed of what portion of the answer is reliable and what is not, thus having a better, more selective answer to trust.

Step:1 Download the git toolkits to local PC
Step:2 git clone https://github.com/ecnelis0/VerifyAI.git
Step:3 Edit the codes
Step4: git add path/files
Step5: git commit -m "check in comments"
Step6: git push
