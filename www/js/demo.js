var events = [
    {
      'Date': new Date(2021, 0, 3),
      'Category': '0',
      'Title': '巨人 VS ソフトバンク',
      'Location': 'わいわい公園',
      'Time': '18:00-22:00'
    },
    {
      'Date': new Date(2021, 0, 9),
      'Category': '1',
      'Title': '鹿島 VS 川崎',
      'Location': 'がやがや広場',
      'Time': '19:00-22:00'
    },
    {
      'Date': new Date(2020, 11, 2),
      'Category': '2',
      'Title': 'パッキャオ VS メイウェザー',
      'Location': 'どやどやパーク',
      'Time': '19:00-21:00'
    },
    {
      'Date': new Date(2020, 11, 2),
      'Category': '2',
      'Title': 'モスラ VS ゴジラ',
      'Location': 'どやどやパーク',
      'Time': '21:00-23:00'
    },
    {
      'Date': new Date(2021, 1, 3),
      'Category': '3',
      'Title': '日本 VS ニュージーランド',
      'Location': 'がちゃがちゃプラザ',
      'Time': '13:00-16:00'
    },
  ];
   
  var settings = {};
  var element = document.getElementById('caleandar');
  caleandar(element, events, settings);
   
  var element_ = document.getElementById('daily_yotei');
  daily_yotei(element_, events, settings);