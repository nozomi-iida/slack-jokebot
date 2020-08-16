const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-1296845119972-1291902296965-nVUNEhyICamW5N3bPszYImOz', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'nozomi_joke_bot',
});

bot.on('start', function () {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  const params = {
    icon_emoji: ':smiley:',
  };
  bot.postMessageToChannel(
    'general',
    'Get ready to laugh with @nozomi_joke_bot!',
    params
  );
});

bot.on('err', err => console.log(err));

bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

const handleMessage = message => {
  if (message.includes('　ジョーク')) {
    chuckJoke();
  }
};

const chuckJoke = () => {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:',
    };
    
    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
};
