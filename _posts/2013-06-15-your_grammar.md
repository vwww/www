---
layout: post
title: "@_grammar_ Bot (formerly @Your_Grammar)"
date: "2013-06-15 18:12:00 -0700"
mdate: "2014-04-21 08:57:00 -0600"
category: Programming
tags: English Grammar Programming Python Web
---
This is a grammar bot that corrects Twitter users' grammar. It <mark>uses heuristics to look for patterns that usually constitute a solecism, and corrects them</mark>. It <mark>doesn't just correct everything</mark>; there are some restrictions.

Notify-Once Restriction: the bot will <mark>try not to correct you if you have been</mark> corrected <mark>in the last month</mark>.

Follower Restrictions: the bot <mark>automatically adjusts the follower count threshold</mark> (slightly) every 15 tweets or 16 hours, whichever occurs earlier, to maintain approximately 1 tweet/3 hours for each of the 14 checks. Some of the checks do not occur often enough, so this results in <mark>less than 120 tweets/day</mark>. Probably only 75% (90 tweets/day) will occur. Also, the <mark>minimum follower:following ratio is 3:2 (1.5)</mark>.

Corrections (tweets): ( [statuses/user\_timeline](https://twitter.com/_grammar_) ) or \[ [from:\_grammar\_](https://twitter.com/search?q=from%3A_grammar_&amp;mode=realtime) \] (not recommended)  
<mark>Replies: \[ [to:\_grammar\_](https://twitter.com/search?q=to%3A_grammar_&amp;mode=realtime) \]</mark> or \[ [@\_grammar\_ -from:\_grammar\_](https://twitter.com/search?q=%40_grammar_%20-from%3A_grammar_&amp;mode=realtime) \] (mentions)  
Mentions without replies: \[ [@\_grammar\_ -from:\_grammar\_ -to:\_grammar\_](https://twitter.com/search?q=%40_grammar_%20-from%3A_grammar_%20-to%3A_grammar_&amp;mode=realtime) \]  
This bot used to favorite every reply, but this action has been reversed.  
Raging responses: \[ [@\_grammar\_ -from:\_grammar\_ fuck](http://topsy.com/s?q=%40_grammar_%20-from%3A_grammar_%20fuck&window=m) \]

<mark>Source code: available on [GitHub](https://github.com/theonlypwner/grammar)</mark>

<!--more-->

**Frequently Asked "Questions"**

Q: *The bot <mark>did not make a proper correction</mark>.*  
Although I strive to keep the error rate low, <mark>the bot is not perfect</mark>. Additional checks have already been added to reduce false positives. Also, if you can improve the bot, feel free to <mark>submit a [pull request](https://github.com/theonlypwner/grammar/pulls)</mark>.

Q: *I made a mistake similar to one by a user whose tweet the bot corrected, but <mark>mine was not corrected</mark>.*  
You need to meet the follower requirement, which dynamically changes, within a few (about 4) minutes of the tweet. <mark>After 8 minutes, it is safe to assume that you will not be corrected</mark>. If you wish to be corrected, you may <mark>force a correction by saying "**I don't supposed to make this mistake.**" or "**#GRAMMAROVERRIDE**"</mark> Any tweet containing that statement (with the period, without quotation marks) or the hashtag (must be entirely in capitals) is exempt from the follower restriction, but it is also case-sensitive. Please note that <mark>it will not bypass the notify-once restriction</mark>.

Q: *When there is a <mark>140 character limit</mark>, doesn't it take precedence over grammar?*  
The bot does not attempt to lengthen your tweet. If it originally searched for something but notices something else, you are extremely unlucky and it might include a correction that lengthens your tweet. <mark>For almost all of the corrections that the bot issues, the length is either shortened or untouched</mark>.

Q: *The <mark>periods</mark> should be <mark>inside the quotation marks</mark>.*  
<mark>No, this is a style choice</mark> in American English, whose "rule" was created to place "convenience above logic": the newspaper printing presses might go out of alignment if the period is outside of the quotation marks, but the British still took the risk of misalignment. However, <mark>this is clearly no longer an issue today</mark>.

Q: *Isn't this a grammar bot? Why does it correct <mark>spelling</mark>?*  
If a misspelling causes a tweet's grammar to falter, it will be <mark>corrected for the grammar error, not for the misspelling</mark>. For example, *there is* is sometimes mistyped as *\*their is* and will be corrected, but *sneak \*peak* (a sneaky mountain?) is sometimes misused to mean *sneak peek* (preview of the future). Both are valid noun phrases, so it does not concern grammar.

Q: *Do you have a <mark>life</mark>? Get a <mark>life</mark>, etc.*  
The <mark>bot isn't even alive; it's just a piece of software</mark>.

Q: *What happened to <mark>freedom of speech</mark>?*  
Because of freedom of speech, you have <mark>the right to use improper grammar</mark>, but the bot has <mark>the right to point it out</mark>.

<del>
Q: *"<mark>My/Our Grammar Police!</mark>"? I/We don't have nor own grammar police. Also, the exclamation mark is superfluous.*  
The account name is <mark>intended to mean ((Your Grammar) Police) rather than (Your (Grammar Police))</mark> and therefore means <mark>*Police of Your Grammar* rather than *Grammar Police of You*</mark>, so although there is an awkward construction, there is no error. Since Twitter allows 20 characters in the name, adding that one exclamation mark allows the name to fully occupy the space given for it. The name is still a <mark>complete noun phrase</mark>.
</del>
This issue has been resolved.

Q: *The <mark>biography uses poor grammar</mark>.*  
While it might be <mark>using awkward constructions</mark>, it does not have any grammar errors; it is <mark>grammatically valid</mark> and shouldn't've been perceived as incorrect. The 'am' in "me, which am alerting" is simple subject-verb agreement and is also notorious for causing unwarranted criticism.

The sentences were fed into the [Stanford Parser](http://nlp.stanford.edu/software/lex-parser.shtml), the resulting parse was modified to have the punctuation inside the words, and the grammar trees were generated with [phpSyntaxTree](http://ironcreek.net/phpsyntaxtree/).

<div class="img-center">
<img src="http://p.cdn.victorz.ca/blog/2012/grammar_tree1.png" width="600" alt="" />
<span class="caption">[ROOT [S [NP [NP [NN @victor_zheng,]] [VP [VBN inspired] [PP [IN by] [NP [NN @StealthMountain,]]]]] [VP [VBN coded] [NP [PRP me,]] [SBAR [WHNP [WDT which]] [S [VP [VBP am] [VP [VBG alerting] [NP [NNS users]] [PP [IN in] [SBAR [WHNP [WP$ whose] [NP [JJ statuses]]] [S [NP [PRP I]] [VP [VBP detect] [NP [JJ improper] [NN grammar.]]]]]]]]]]]]]</span>
</div>

<div class="img-center">
<img src="http://p.cdn.victorz.ca/blog/2012/grammar_tree2.png" width="600" alt="" />
<span class="caption">[ROOT [S [S [VP [TO To] [VP [VB publish] [NP [NNS solecisms]]]]] [VP [VBZ abases] [NP [PRP oneself!]]]]]</span>
</div>

Also, here's a nice fact about <mark>the biography: it uses exactly 160 characters, the maximum allowed</mark> by Twitter.

Q: *<mark>Shouldn't 'fewer' be used for countable nouns</mark> instead of 'less'?*  
Alfred the Great (888 AD) [used 'less' for a number of words](http://itre.cis.upenn.edu/~myl/languagelog/archives/003775.html). Also, this <mark>modification would lengthen the tweet</mark> and is <mark>difficult to implement</mark>. Usually, 'fewer' is preferred over 'less' for countable nouns (except amounts like time, money, distance, speed, etc.) but does not have to be used, just like in the quote from Alfred the Great: "Swa mid l&aelig;s worda swa mid ma, sw&aelig;&eth;er we hit &#541;ereccan ma&#541;on." This means *whether we may prove it with less words or with more*.

Q: *Wasn't this account <mark>suspended</mark>?*  
It was at one point, so I had to write this to Twitter many many times:

@Your_Grammar, in a manner similar to @StealthMountain, which is not suspended, is my account and notifies users when they have made typing mistakes, but only once per user.

> Upon registration, I agreed to the Twitter Terms of Service, Rules, and Privacy Policy.  
> My actions do not violate any rules specified those pages. The only prohibited uses of @replies are these two:
> 
> to send large numbers of duplicate @replies or mentions;  
> to send large numbers of unsolicited @replies or mentions in an  
> attempt to spam a service or link
> 
> My account, by sending @replies in a manner similar to that of @StealthMountain, does not spam any service nor does it spam links. Since it only @replies a user that it has not @replied before, it does not send any duplicates @replies.  
> There is no prohibited following behavior that was/is/will be engaged in.
> 
> You may review all of this account's tweets, and you will find that all of them do not even mention any service, and all of them have no links. They are all @replies, with no links and no services.
> 
> Thank you in advance!

Their automated system requires me to make a reply before they will consider my request:

> I confirm that the account complies with the Twitter Rules as described in my initial request.
