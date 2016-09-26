var filterQuestion = (question) => {
  if (!question) {
    return false;
  }
  if (question.match(/\?/)) {
    return false;
  }
  if (question.match(/факт|факты|факта|фактов/ig)) {
    return false;
  }
  if (question.match(/100%|%/ig)) {
    return false;
  }
  if (question.match(/фото|фотку|онлайн|скрин|опиши|обмен|магазин|конкурс/ig)) {
    return false;
  }
  if (question.match(
    /подписана|подписан|подпишись|полайкай|кинь/ig)) {
    return false;
  }
  if (question.match(
    /1\.|,/ig
  )) {

  }
  question = question
    .replace('\n', '')
    .replace('<h1 class="streamItemContent streamItemContent-question">', '')
    .replace('</h1>', '')
    .replace(/^\s{0,}/, '')
    .replace(/\s{0,}$/, '')
    .replace(/&quot;/, ' ')
    .replace(/\n/ig, '')
    .replace(/&lt;/, '<')
    .replace(/<a class="questionersName" .{0,}<\/a>/, '');
  return question;
};

module.exports.filterQuestion = filterQuestion;