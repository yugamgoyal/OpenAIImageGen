const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const generateImage = async(req, res) => {
    const prompt = req.query.prompt;
    console.log(prompt);
    // req.query.input
    // res.json({
    //     urlOfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Chain_link_icon.png/440px-Chain_link_icon.png",
    //     otherData: input
    // });

    try {
        const response = await openai.createImage({
          prompt,
          n: 1,
          size: '512x512',
        });
    
        const imageUrl = response.data.data[0].url;
    
        res.status(200).json({
          urlOfImage: imageUrl,
          otherData: prompt,
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated',
          });
        }
}

module.exports= {generateImage}