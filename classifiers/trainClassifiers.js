var natural = require('natural'),
  trumpClassifier = new natural.BayesClassifier();
  clintonClassifier = new natural.BayesClassifier();
  totalClassifier = new natural.BayesClassifier();


// Trump

var negativeTrumpTweets = [
  'The only thing Melania Trump stole...was the hearts of racists',
  'After the outcry from #melaniaspeech, the Trump Campaign has fired her two top speech writers, "Copy and Paste". #MelaniaTrump  #',
  'I agree Imani, he\'s almost worse than Trump with statements that are not only horrific but so untrue....',
  '$20 if you can find 1 thing that Adolf "jew slayer and KKK grandmaster" Trump has said that is as inflammatory. (You can\'t)',
  'Offensive things #Trump has said about Latinos',
  'Melania Trump doesn\'t even have a college degree',
  'I cannot believe that the racist supremacist #Trump\'s wife stole a black person\'s speech? Oh, wait...  didn\'t #Elvis do the same with music?',
  'Trump would run the US into ground like he did his bussineses! ',
  'All Trump supporters are low class, ignorant & racist. U need proof? Check out list  below. ',
  'I love Tennent\'s Lager. #BorisSucks #TrumpSucks ',
  'honestly terrified of what could happen to our country if trump becomes president this election sucks!!!!!',
  'Why is it that after a day of Powerful people spouting Xenophobic ideology the thing we meme about is that Mrs Trump sucks at term papers?',
  'When people talk about politics on social media all I hear is negativity. Ether Hilary sucks or Trump sucks. Nothing productive about that.',
  'Everyone voting for Trump knows he pretty much sucks, so it\'s basically white nihilism: destroy the country instead of letting it open up.',
  'We think Trump\'s been involved in more than 5,500 lawsuits. We\'re going to try and read them all in 4 hours:',
  'I think Donald Trump would destroy America at a rate of 10X faster than Isis could imagine.',
  'I am truly convinced Donald Trump is the Anti-Christ',
];

for (i = 0; i < negativeTrumpTweets.length; i++) {
  trumpClassifier.addDocument(negativeTrumpTweets[i], 'negative');
}

var positiveTrumpTweets = [
  'You should share this wonderful video of the Trump Family all over the place! Awesome!',
  'Republican Convention Ratings Steady With 2012, ‘Bachelorette’ Tops Night',
  'What? We LOVE TRUMP!!! If you have #kids you will change your mind to Trump.',
  'No shockers here. ~ We asked Trump voters, "When did America stop being great?" Their answers were amazing. ',
  'TRUMP NEEDED!!! ONLY TRUMP!',
  'great piece in tonight\'s Evening Standard. God help us all of Trump succeeds.......',
  'I\'m a trump guy but this is 100% correct.  Jacob Fain added',
  'I am a Young Democrat for Trump!!! We love you! 🇺🇸🇺🇸🇺🇸',
  'you\'re so done!Nobody will EVER show the love and passion toward you like Trump does! You 💵 the❤️ ',
  '#Trump will never, ever say I\'m sorry or wrong or offer an apology or admit he is less than terrific. It\'s what his fans love about him.',
  'My father @realDonaldTrump introducing Melania for her amazing speech. @DonaldJTrumpJr #Trump2016',
  'Wow! What is about to be announced by Mr.Trump will be unprecedented. He is going to be an amazing POTUS for All Americans..stay tuned.',
  'Trump now leads in a trustworthy liberal poll',
  '#Pence appeals for GOP unity after '
];

for (i = 0; i < positiveTrumpTweets.length; i++) {
  trumpClassifier.addDocument(positiveTrumpTweets[i], 'positive');
}


trumpClassifier.train();

console.log(trumpClassifier.classify('This is only slightly above the \'MY DAD CAN BEAT UP YOUR DAD\' that I expected from the Trump "campaign".'));
console.log(trumpClassifier.classify('Trump better not win.'));
console.log(trumpClassifier.classify('Trump Is Getting Even Trumpier — AND WE LOVE IT! Steady guy you can count on, unwavering and principled '));

trumpClassifier.save('classifiers/trumpClassifier.json', function(err, classifier) {
  if (err)
    throw err;
});

// Clinton

var negativeClintonTweets = [
  'Remind me: what was the verdict of Clinton\'s trial in the Senate? ',
  'Hillary Clinton should be labeled a terrorist it\'s hard to say how many Americans died because of her in this Administration',
  '@HillaryClinton @ddlovato and you support child rapist yet you are running for president #Trump2016 #Clinton #PresidentialElection',
  '"Clinton Foundation Can Bring Down Entire U.S. Government" - FBI Source. ',
  'If You want to see America destroyed by God then you support Hillary Clinton',
  'Hillary Clinton 1969 thesis was on Saul Alinsky rules for radicals.The Clinton Chapters Ch.6 The Thesis',
  'A vote for Hillary Clinton is a vote for Wall Street and a vote for the top 1%',
  'I will never, ever, ever vote for Hillary Clinton. What do ya know, something in common with Bernie voters...',
  'I don\'t want Hillary. That\'s why I didn\'t support the one guy running who could lose to her.',
  'I feel like you have to be mentally ill or really really stupid to support Hillary Clinton.',
  '@_TheCivilRight @KevinStAug But you don\'t care about HRC 110 classified emails or Muchell spending 200 million of your money on vacations :(',
  'Trump gets it on trade-Hillary Clinton does not',
  'I blame Hillary Clinton personally for the death of my son',
  'Plagiarism is standard Clinton attack but nobody is guiltier than #Hillary. #Trump2016 America loves @MELANIATRUMP!! ',
  'Hilary couldn\'t even keep Bill satisfied and you think she can run this country?', 
  ' FBI case makes it crystal clear to the rest of us. HRC got special treatment from insiders. #tcot #ccot #gop #maga ',
  'Again, you gonna win with these numbers? Bernie\'s Clinton endorsement didn\'t have large impact on most Dem voters',
  'Eating lunch with a bunch of hilary supporters hating on trump. God save me from listening to this crap. #MakeAmericaGreatAgain',
  '@Jorge_Silva @HillaryClinton This off the cuff message was brought to you by 35 idiot millenials and 3 focus groups.',
  'ClintonFoundation is a fraud!',
  '@Jorge_Silva @HillaryClinton Bernie Sanders calls out Hillary for her racist language',
  '@1stAirDel_USMCR Bill Clinton is America\'s First RAPIST, Pedophile Meth Head, AIDS President',
  'did NOTHING 2save our ppl in Benghazi US Airplane never came no1 came EVER Libyia plane rescued them',
  'HILLARY CLINTON LECTURES ON WHITE PRIVILEGE. HOW ABOUT THE PRIVILEGE OF THE ELITE?',
  '#stubbornhillary insists it was just a mistake and she wasnt careless in her email fiasco.',
  '@HillaryClinton says the woman who used a  \'get out of jail\' card. You\'re no better than Trump. Delete yourself from our lives!',
  'same people who ignore H. Clinton\'s crimes', 
  'THE RACKETEERS, CLINTON CRIME FAMILY NEED TO BE ARRESTED &amp; CHARGED.  OBVIOUSLY THERE IS EVIDENCE',

];

for (i = 0; i < negativeClintonTweets.length; i++) {
  clintonClassifier.addDocument(negativeClintonTweets[i], 'negative');
}

var positiveClintonTweets = [
  'Hillary Clinton 1969 thesis was on Saul Alinsky rules for radicals.The Clinton Chapters Ch.6 The Thesis',
  'Bam! She is awesome! #HillYes RT @SFL4Hillary: Throwback! Clinton Schooled Rep. Pence (R-IN): Obama Won the Election ',
  'It would be so awesome for Clinton to just once shake off the safe play and pick Warren as VP to go all the way.',
  'I don\'t want a president who thinks *reading* is for losers. Y\all, this is insane. There\'s no comparison. Vote for Clinton.',
  'Whether you\'re a democrat or a republican, you have to admit it would be pretty cool to have Bill Clinton be the First Lady of the US',
  'Clinton Pledges Constitutional Amendment To Overturn Citizens United In Her First 30 Days- very cool!!! ',
  'I can walk and chew gum at the same time. I can also enthusiastically support Hillary and champion the revolution Bernie represents.',
  'I didn\'t think it could get worse than Bush and Cheney, but this beats it. Only these GOP lunatics  can make me support for Hillary Clinton.',
  'I support Hillary. Agree with your hate/fear comment. But we stoop to Trump\'s level w/personal attacks. Pls take high road',
  'Melania Trump\'s first speech stolen from Michelle Obama. How do we TRUST Trump\'s family. Vote for Hillary Clinton, tested and trusted',
  'Hillary Clinton Has a 76 Percent Chance to Win the Presidency ',
  'Clinton Beats Trump Among Latinos 76 Percent to 14 Percent',
  '#NeverTrump RT ChrisMegerian: Is Hillary Clinton announcing her vice presidential pick on Friday? "I expect that\'s about right,"',

];

for (i = 0; i < positiveClintonTweets.length; i++) {
  clintonClassifier.addDocument(positiveClintonTweets[i], 'positive');
}


clintonClassifier.train();

clintonClassifier.save('classifiers/clintonClassifier.json', function(err, classifier) {
  if (err)
     throw err;
});

// Combined classifier

var positiveTweets = positiveTrumpTweets.concat(positiveClintonTweets);
for (i = 0; i < positiveTweets.length; i++) {
  totalClassifier.addDocument(positiveTweets[i], 'positive');
}

var negativeTweets = negativeTrumpTweets.concat(negativeTrumpTweets);
for (i = 0; i < negativeTweets.length; i++) {
  totalClassifier.addDocument(negativeTweets[i], 'negative');
}

totalClassifier.train();

totalClassifier.save('classifiers/totalClassifier.json', function(err, classifier) {
  if (err)
     throw err;
});

