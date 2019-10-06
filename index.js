const {getChatId, debug} = require('./helpers')
const { TOKEN, DASHBOT_API_KEY } = require('./config')
const TelegramBot = require('node-telegram-bot-api')
const { next, back } = require('./keyboard-buttons')
const dashbot = require('dashbot')(DASHBOT_API_KEY).universal;

//just basic example, should be customized later
const messageForDashbot = {
  "text": "Hi, bot",
  "userId": "USERIDHERE123123",
  "platformJson": {
    "whateverJson": "any JSON specific to your platform can be stored here"
  }
};

console.log('Bot has been started')

const bot = new TelegramBot(TOKEN, {
  polling: true
})

let step = 0;
let html = null;

bot.onText(/\/start/, msg => {
  step = 0;

  //just basic example, works with fake messageForDashbot object, only when /start command is executed
  dashbot.logIncoming(messageForDashbot);

  const { id, first_name } = msg.chat
  bot.sendMessage(
    id,
    `Просто следуйте инструкциям, ${first_name}. Я научу вас шутить шутки, я супер обучательный бот. А теперь нажмите на кнопку "продолжить".`,
    {
      reply_markup: {
        keyboard: [
          [next],
        ],
      }
    }
  )
})

bot.on('message', msg => {
  const chatId = getChatId(msg);
  const { first_name } = msg.chat
  
  switch (msg.text) {
    case next:
      ++step;
      break
    case back:
      if (step > 0) {
        --step;
      }
      break
    
    case "Хочу в команду":
      step = 9;
        html = `
          ▪️Шаг 8. Стойте! Важно!▪️
          <a href="https://www.youtube.com/watch?v=5WaKyo6Mt5I">https://www.youtube.com/watch?v=5WaKyo6Mt5I</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['РЕГИСТРАЦИЯ'],
              [back],
            ],
          }
        })
      break

    case "Хочу наблюдать":
      step = 9;
        bot.sendMessage(
          chatId,
          `Вот ссылка на закрытый канал за наблюдением за результатами нашей команды КВН \n
          👇жмите👇
          тут ссылка`,
          {
            reply_markup: {
              keyboard: [
                [back],
              ],
            }
          }
        )
      break
    case "Написать мне":
      step = 9;
        bot.sendMessage(
          chatId,
          `Вот ссылка для связи с юмористом \n
          👇жмите👇
          тут ссылка`,
          {
            reply_markup: {
              keyboard: [
                [back],
              ],
            }
          }
        )
      break
    case "РЕГИСТРАЦИЯ":
      step = 10;
        html = `
          ▪️Шаг 9. Начало регистрации▪️
          Для начала вам необходимо установить смешной ютуб. Выберите нужную кнопку
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Регистрация через телефон', 'Регистрация через компьютер'],
              [back]
            ],
          }
        })
      break

    case "Регистрация через телефон":
      step = 11;
      html = `
          ▪️Регистрация через телефон▪️
          <a href="https://www.youtube.com/watch?v=s2G5yXTI7UE">https://www.youtube.com/watch?v=s2G5yXTI7UE</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Покупка смеха'],
              [back]
            ],
          }
        })
      break
  
    case "Регистрация через компьютер":
      step = 11;
      html = `
          ▪️Регистрация через компьютер▪️
          <a href="https://www.youtube.com/watch?v=92UgA6qj0IA">https://www.youtube.com/watch?v=92UgA6qj0IA</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Покупка смеха'],
              [back]
            ],
          }
        })
      break

      case "Покупка смеха":
      step = 12;
      html = `
          ▪️Пополнение шуткокошелька▪️
          Выберите, из какой страны вы хотите купить шутку.
          Выберите нужную кнопку.
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Для всех стран', 'Для Казахстана'],
              [back]
            ],
          }
        })
      break

      case "Для всех стран":
        step = 13;
        html = `
         Пополнение через сервис Best Jokes из любой точки мира.
         <a href="https://www.youtube.com/watch?v=92UgA6qj0IA">https://www.youtube.com/watch?v=92UgA6qj0IA</a>
         __________________
         Заметка: Не покупайте юморок через карту Шуткобанка. Сначала переведите на Хихи/Смешняндекс, и потом уже покупайте.
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Регистрация в ШуткоХендс'],
              [back]
            ],
          }
        })
      break

      case "Для Казахстана":
        step = 13;
        html = `
        Для пополнения запаса шуткаф из Смехостана используйте этот сервис.
         <a href="https://www.youtube.com/watch?v=92UgA6qj0IA">https://www.youtube.com/watch?v=92UgA6qj0IA</a>
         <a href="standup.by">Ссылка на сервис</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              ['Регистрация в ШуткоХендс'],
              [back]
            ],
          }
        })
      break

      case 'Регистрация в ШуткоХендс':
        step = 14;
        html = `
        ▪️Шаг 13. Регистрация▪️
          <a href="https://www.youtube.com/watch?v=5ZNFGMe2f5g">https://www.youtube.com/watch?v=5ZNFGMe2f5g</a>
        `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Получить реферальную ссылку'],
                ['Наблюдать', back]
              ],
            }
          })
        break
  
        case 'Получить реферальную ссылку':
        step = 15;
        html = `
          ВНИМАНИЕ! Эта реферальная ссылка только для входа сразу на 3 уровня юмора (0.65 смешков)!
           <a href="cryptosmeh.ru/YOUR_ID">cryptosmeh.ru/YOUR_ID</a>
           Это финиш, ребят. Удачи!
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                [back]
              ],
            }
          })
        break

        case 'Наблюдать':
        step = 15;
        html = `
          ▪️Ссылка на канал▪️
          Вот ссылка на закрытый канал для наблюдения за результатами нашей команды КВН
          👇жмите👇
          тут ссылка
          Это финиш, ребят. Удачи!
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                [back]
              ],
            }
          })
        break
  }



  if (msg.text === next || msg.text === back) {
    switch(step) {
      case 0:
          bot.sendMessage(
            chatId,
            `Просто следуйте инструкциям, ${first_name}. Я научу вас шутить шутки, я супер обучательный бот. А теперь нажмите на кнопку "продолжить".`,
            {
              reply_markup: {
                keyboard: [
                  [next],
                ],
              }
            }
          )
        break
  
      case 1:
        bot.sendMessage(chatId, 'Пожалуйста, подождите. Загружаю гифку...')
        bot.sendDocument(chatId, './gifshot.gif', {
          reply_markup: {
            keyboard: [
              [next],
              [back],
            ],
          }
        })
        .catch(error => {
            bot.sendMessage(
              chatId,
              `картинка не загрузилась - плохой интернет. ну и ладно! поехали дальше!`,
              {
                reply_markup: {
                  keyboard: [
                    [next],
                    [back]
                  ],
                }
              }
            )
          }
        )
        break
      
      case 2:
        html = `
          ▪️Шаг 1. Вступление▪️
          <a href="https://www.youtube.com/watch?v=xzbB7CuWusM">https://www.youtube.com/watch?v=xzbB7CuWusM</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              [next],
              [back]
            ],
          }
        })
        break

      case 3:
        html = `
          ▪️Шаг 2. Прежде, чем начнем▪️
          <a href="https://www.youtube.com/watch?v=fI1wAY8ON-E">https://www.youtube.com/watch?v=fI1wAY8ON-E</a>
          Примечание: +10 шуток в вашем багаже! Огонь!
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              [next],
              [back]
            ],
          }
        })
        break

      case 4:
          html = `
            ▪️Шаг 3. 10 причин выбрать смешные шутки▪️
            <a href="https://www.youtube.com/watch?v=V0OlU6ykMr8">https://www.youtube.com/watch?v=V0OlU6ykMr8</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                [next],
                [back]
              ],
            }
          })
        break

      case 5:
          html = `
            ▪️Шаг 4. Джим Джеффрис - кто это? Слишком такое-себе?▪️
            <a href="https://www.youtube.com/watch?v=qh-VkGZpCnA">https://www.youtube.com/watch?v=qh-VkGZpCnA</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                [next],
                [back]
              ],
            }
          })
        break

      case 6:
        html = `
          ▪️Шаг 5. Как работает импровизация в юморе?▪️
          <a href="https://www.youtube.com/watch?v=C2kfRhHQ-kM">https://www.youtube.com/watch?v=C2kfRhHQ-kM</a>
        `;
        bot.sendMessage(chatId, html, {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: [
              [next],
              [back]
            ],
          }
        })
        break

        case 7:
          html = `
            ▪️Шаг 6. Шутки. Закрепим. ▪️
            <a href="https://www.youtube.com/watch?v=Oh6gpglbYEY">https://www.youtube.com/watch?v=Oh6gpglbYEY</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                [next],
                [back]
              ],
            }
          })
          break
        
        case 8:
          html = `
            ▪️Шаг 7. 100 Шуток (примерно 20 000 смеха) за 8 недель. Стратегия. ▪️
            <a href="https://www.youtube.com/watch?v=xkWZhQ67Cq0">https://www.youtube.com/watch?v=xkWZhQ67Cq0</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Хочу в команду'],
                ["Хочу наблюдать", 'Написать мне'],
                [back]
              ],
            }
          })
          break
        
        case 9:
            html = `
              ▪️Шаг 8. Стойте! Важно!▪️
              <a href="https://www.youtube.com/watch?v=5WaKyo6Mt5I">https://www.youtube.com/watch?v=5WaKyo6Mt5I</a>
            `;
            bot.sendMessage(chatId, html, {
              parse_mode: 'HTML',
              reply_markup: {
                keyboard: [
                  ['РЕГИСТРАЦИЯ'],
                  [back]
                ],
              }
            })
          break

        case 10:
            html = `
              ▪️Шаг 9. Начало регистрации▪️
              Для начала вам необходимо установить ютуб. Выберите нужную кнопку
            `;
            bot.sendMessage(chatId, html, {
              parse_mode: 'HTML',
              reply_markup: {
                keyboard: [
                  ['Регистрация через телефон'],
                  ['Регистрация через компьютер'],
                  [back]
                ],
              }
            })
          break

        case 11:
          html = `
            ▪️Регистрация через телефон▪️
            <a href="https://www.youtube.com/watch?v=s2G5yXTI7UE">https://www.youtube.com/watch?v=s2G5yXTI7UE</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Покупка смеха'],
                [back]
              ],
            }
          })
          break

        case 12:
          html = `
            ▪️Пополнение шуткокошелька▪️
            Выберите, из какой страны вы хотите купить шутку.
            Выберите нужную кнопку.
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Для всех стран', 'Для Казахстана'],
                [back]
              ],
            }
          })
          break

        case 13:
          html = `
            Пополнение через сервис Best Jokes из любой точки мира.
            <a href="https://www.youtube.com/watch?v=92UgA6qj0IA">https://www.youtube.com/watch?v=92UgA6qj0IA</a>
            __________________
            Заметка: Не покупайте юморок через карту Шуткобанка. Сначала переведите на Хихи/Смешняндекс, и потом уже покупайте.
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Регистрация в ШуткоХендс'],
                [back]
              ],
            }
          })
          break

        case 14:
          html = `
          ▪️Шаг 13. Регистрация▪️
            <a href="https://www.youtube.com/watch?v=5ZNFGMe2f5g">https://www.youtube.com/watch?v=5ZNFGMe2f5g</a>
          `;
          bot.sendMessage(chatId, html, {
            parse_mode: 'HTML',
            reply_markup: {
              keyboard: [
                ['Получить реферальную ссылку'],
                ['Наблюдать'],
                [back]
              ],
            }
          })
          break
    }
  }
})