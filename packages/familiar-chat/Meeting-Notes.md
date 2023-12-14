So I'm just sort of modeling it with what we have so far. But on the left-hand side, we have the UI for host. On the right-hand side, we have another user, Alice. Host has a host of objects, and Alice
has none on the right. And what this is, is a chat program, so we can go to here, and we can say hi, Alice. And then Alice, we'll see the message over here. And it
works much like you would expect chat work.
I guess I'll explain these objects here. So host has a bunch of things.
Happens to have a couple of guests here. These are like profiles, has a bunch of cards. This is from my previous demo, and these are all objects. And then we have a couple of apps, familiar chat, that is this app that we're using right now.
The one KCE game that I demonstrated previously, and then we have another
profile down here. And so yeah, we can, the apps have this special option to open the app. So let's go ahead and open the game. So this is the game from last time, it should look familiar. We can start making a deck, and we can add some cards to it.
And not just
that,
we can now say, let's play a game.
And you can reference pet names right here in your chat. And I must say, I didn't have to do all this. All this was already built into the pet name by Chris, and so I'm just added it to the UI in a few
different ways.
Okay, so
let's send this game,
let's send
this app to Alice.
And we started a
deck under the guest deck.
And let's also send Alice a card, I bet
Alice would like a card of view.
Okay.
So on the right hand side, you can see that one, Alice doesn't have anything in her inventory yet.
And
two, these references on the right hand side in the message all sort of the question work.
This
is because they are, these
messages include references to these objects, but they don't appear in Alice's inventory.
But if we take a look at them, we can see some controls here.
And we have this card deja vu, it is an object, and we can, you know, adopt it under some different name, or we can keep that default name. And so when I press
this, it will add it to our inventory. And similarly for deck, we have an opportunity to call it
something else, but we'll just leave it like this for now. So now we have three things in our inventory. Also we have the game, now the game is a little different because it's an app. And so we can install app.
And what that will do is it'll, the app contains like an app bundle, and then it's also associated with a profile.
And what this will do is it'll add the game with our profile
here. Now we probably, you know, the profile implies having access to all our inventory. And so normally you'd probably want to install it with some empty profile, then it would ask you for the powers it needs, but for the sync of this demo, I'm just giving it the power that the user has. So I'm going to go ahead and install
the app. And so now that we've installed this app, we can open it up. And it's reading from our pet name
list. And so it sees the deck that
we got, and also the
card that we got.
So now we can start contributing cards to this deck as well.
And so back on
host, host sees the cards that Alice added.
And
now, and can initiate starting the
game. So now we have, if we go back over here to the inventory of the host, we see that we now have a game. And we can say to Alice, hey, start of the game, let's play.
And
Alice sees a message, Alice can adopt the
game. And when she goes back to her game, it loads the game.
Now for this demo, I did not modify the game. So it's still built as a hot seat multiplayer. And so you're not going to see a proper multiplayer experience, but it kind of works
for you can play the game with the floor.
But the main thing I wanted to highlight
was how you can
both transfer objects easily by just sending a message and referencing it in there, as well as transferring applications that consume those objects. And yeah, that
was the demo.
Thanks. I guess we can do Q&A now.
Can we see for just the pleasure of seeing it happen, restarting the whole thing and the references being reconstructed?
Ah, yeah. So for, yeah, so we're going to simulate a restart of the computer.
That's the right command. I always confuse restart and reset, which erases everything. Okay, Alex, good.
So now I'm going to reload this, that sort of inbox looks the same, reload the game.
The game looks the
same and, oh, yeah, we're logged in as Alice over here. Ooh, interesting. We lost chat history. I'm not
sure why we lost chat
history,
but we retained it.
There's no message persistent in mailboxes yet.
We persist our inventory and the game works
for Alice as well.
Really subtle and not something I can zoom, but if you notice the URL for these applications are different because they entrain, they're associated
with different
powers.
This one is being associated with Alice and this one being associated with the host. Oh, one thing that I forgot to mention that is really important is this was design was largely based on the presentation from
the Sprightly project on their chat
app, but
this very little, most of this was ready to go out of the box in the pet name demon and mostly involved just building the UI and then adding
a couple of things like exposing type information of objects.
So pretty much out of the box with pet name and this is really nice. So how does Alice know
that game one and KCE is there?
Yeah, so it is indicated
in, so there's behind the scenes in the pet name
demon, there's different kinds of formulas and those formulas
have internal types
and that's like, is it a profile? Is it a data blob?
Is it an app
bundle?
And
that internal type is exposed to the UI and a app or
web bundle is one internal type.
We haven't. Oh, okay, so what's called a weblet or something? Is it an app?
Yes.
Yeah.
Yeah.
The internal type is web bundle. Okay.
That's what the string is inside of the data demon. And then
unsafe means it was loaded with unsafe. Yeah, that is not an actual requirement to produce this sort of demo.
But the way of I was being
lazy, the short answer is I was being lazy. Sure.
But it means that it's running
down confined, right?
I'm not
actually sure what kind of safety it refers to.
Okay.
Yeah.
Yeah.
Then safety isn't, oh, I see.
Yeah, yeah, yeah. The formula is unsafe bundle and unsafe in this case means that
it's not that it's running off of the file system and that it's running in pure node. It's not confined. Yeah.
I wonder if we should start using the word unconfined there because it's running the same node that everybody is seen kind of code that everybody else uses. It's not some scary thing. Yeah. It's safe. You know, like you're used to.
Yeah. This is the, yeah, this is the level of safety that you have accepted tacitly whenever I'm installed something that it's not unsafe so much is that, yeah, it's unsafe, but.
Anyway, I confined is kind of interesting.
Yeah.
Yeah.
Again, that was just because I, the bundling functionality was not exposed to the web browser as neatly. And so it was easier to just import it without bundling, but that would be trivial to fix.
Yeah.
I had something that should go ahead. Sorry. When you say profile, what are you referring to? Yes.
So, yeah, I think that, but so Aaron was
synthesizing the, the sprightly demo.
And then the sprightly demo, there is an entity called a profile. And what we discovered was
that the, what I had called hosts and guests were
kinds of profile.
Yeah.
And one thing
that they have is like, they have their own set of pet names, they
have their own inbox for receiving
messages.
And so right now we're looking at the
profile for host. Here, we're looking at the profile for Alice on the right hand
side. And similarly, we could look at the profile for the guest for the game and you can see it's internal pet name references that it has saved or for the
deck has pet names for all the cards that have been added to the deck. Yeah.
I was struggling to internalize this, this command line
objects for, you know, act as this person or act as a head person. I guess these guests are sort of computing you're likely to do on behalf of other parties. Yeah,
that would
be fair.
There are two uses, if you're creating multiple host objects, those are what I think correspond most closely to profiles.
The guest
objects were
like agents of
third parties.
Okay.
And I have, for the sake of this demo, I've made the guests really powerful. So they're not that different from a host at this point on my setup, but that's not merged.
Yeah, I think the main thing is being able to hold pet names and receive messages. And so like when
I, it's not entirely set up that way, but when you like, you know,
when we set up the
game, we are, when do
we do this or I think
the clear example is the deck. Okay.
So the deck, you know, of course it's keeping track of its cards. And then whenever
I
send a card
to the, to the
deck, you know, I'm using
the UI to add cards to the deck, but what's happening behind the scenes is equivalent
to saying card.
And here I'm going to show, I didn't demo, put this in the demo, but I'm renaming, I'm referencing a pet name in my
message, and I'm renaming it.
So like it's, the name is going to be different
from my name when it appears in the message. And I never can
remember which one is on the left, which one is on the right. But I think
if I do it like this, I think that worked.
Okay.
So I sent a message to the deck with a reference to a card named card and it received
the deck
which is this
automated agent
received the card
and added it to
its inventory.
So I sent it to the guest deck, but the deck object which is running with the
guest deck profile is reading from the guest
decks, a message inbox and operating on it.
I don't know if that was clarifying or more confusing, but that was, that's what's happening.
Right. So another piece that I'm juggling around in my head is how
guests and workers relate.
They
are mostly orthogonal.
You can, for example, have multiple guests that share a worker.
Yeah.
Yeah.
Yeah.
That was my brain. I have to think about it. There is a process a guest is an inbox and pet name
store.
So in, and they're
largely, the workers are largely stuffed underneath the rug, so to speak.
Like if you create
every time you create a caplet, it will implicitly create a new worker for you.
It's anonymous, it just won't
have a name.
And that's actually kind of problematic and needs to be possible to discover the worker that was created on
your behalf so that
you can manage
it.
So then that's just an open problem.
Yeah.
You can do that though, right? If you were
to spawn, you can, can you do that currently?
If you were to spawn the worker and store it. Yeah.
If you spawn the worker yourself and give it a name and then use that name when you create the worker, you have control over that.
See that
again? You can use the endo spawn command to create a worker
and then use endo make and then assign a worker to the thing that you made by name. How many workers are we talking about? Lots.
Yeah, lots of work. No, no, no. In the example, just one. In the example, there's one. Okay.
How many guests are we talking about? Just one.
Where did you start talking about a guest? I didn't. Okay. So here's
the full endo make -w worker name
-p guest name and then the -b for the bundle name gives you a capability
constructed
from that bundle given those powers, given
the powers of that guest in the worker you designated.
If you omit the
worker, it will create one for you.
Okay.
If you omit the powers, it will give you least authority,
which just rejects any
request. And if you omit the -b, it will take a file name and construct the bundle on your behalf.
Okay.
And if you're electing to use any of those implicit behaviors behind the scenes, you don't get pet names for the intermediates.
So you could do that make with
two - you
could do make with Alice in worker one and then make with Bob in worker
one. You can.
Okay.
Yeah.
So they're largely orthogonal.
The where - where I think that I'm going to go is to make them slightly less orthogonal.
And
I'm thinking
that we should add a main
worker for each guest and then just by default use the same worker for
anything that guest - anything
made for that
guest.
That seems like a good default behavior
that makes fewer workers and also has the same confinement guarantees that they can - they can mess up their - the guest can mess up their own house. But
another question is, in some sense, as workers come and go and - and guests stay around, although worker formulas kind of stay around too.
Yes.
Worker formulas stay around. But all that means
is that it will consistently
put - tablets in the same boxes. They will be - they will be placed in the same boxes and you will be able to look in the same places for their
logs. Yeah. I was going to mention that if you take that approach with the workers, that would eliminate all the fun that comes with having to, you
know, sift through the different worker logs. Oh,
right. Yeah.
Eliminating the fun of - I hope to make sifting through worker logs less fun. And also in the long-term, less necessary, and this week posted an issue about
how uncomfortable and impolite it is to interrogate the logs for the purposes of doing a causal trace.
Because if you run something on the CLI with endo run, you're going to - every error is going to become a marshalling error and an adventure into the logs to find out where the actual error came from.
It is possible to build a trace aggregator
and endo is - I'm
excited that the pet demon is in an excellent position
to expose trace - for the
pet demon to become a trace aggregator and the workers to be able to express - to expose a trace - an end point - a CAPTP endpoint for flushing their internal - flushing their internal ring buffer
for errors.
And that would mean that all of the errors could be collected and then ascribed to pet named workers for the purposes
of following traces. So we could reconstruct on further benefit of the user at the command line, especially
a trace that says, "Hey, this happened in worker named X," and then that happened in worker X because of something that happened in worker Y, et cetera, et cetera. The other - so you - this was
somewhat inspired by the - it's partly work. Did you - have you seen the immunity
from Barbra's to safety from geeks bearing gifts demo from 2002?
Aaron?
The name sounds familiar, but I don't remember the content in the talk. Okay.
I think I have seen it, but it has been a really long time and based off of that, my intuition is that
the sprightly
presentation was - was a rehashing of a lot of the same ideas.
Okay.
Yeah.
CAPTIS was certainly a child. I've never heard it - the presentation, but I did hear the phrase geeks bearing gifts. So it's been reused elsewhere.
Right. Well, geeks
bearing
gifts - I don't - I'm not
sure that Mark Miller coined that or anything.
I mean, geeks
bearing gifts goes back to the choice of horse and stuff, right? It's an irresistible pun. It's hard to believe that Mark would be the first. But also, awesome if he did.
Anyway, that was the first talk where I saw with, you know, confined agents handing each other
games over chats and stuff.
Yeah.
And Aaron, is the chat section - it's the same message log, right?
You've just added new message types or have you - you haven't even added new message types? I did not add new message types. It's pretty much the same as you had built it. I added some more information, like type information of what's included inside the package. Yeah.
And it's really, really exciting that you've put in the log in as my - my notion for that was that there would be something similar to your open app button that if you find in your inventory a party, like the app or like guest - the Alice and Bob guest lines that we could have
a button there
for opening
- for recursing, I guess, on the
same - no.
Essentially having a way to open up this same app bundle with the other guest as its powers.
Yes.
This actually works and it worked and I didn't expect it to while I was thinking this. So if I can - you know, I have a couple of apps in here.
There's the game that we were just playing and this is this chat app right here and if I send that to Alice, just build it
right, I can install that app.
And if you notice again, sorry, I can't zoom
this up but this app and this app are exactly the same as in - they're hosted with the same powers of the host. They're just viewing
this profile of Alice. But now that we've installed - did we install it - nope, let's install it and we did install it here. It is now
that we open this - it says it's hosted at the top but this is Alice and these are Alice's inventory and - I'm sorry, I accidentally
pressed the pause button when I was trying to get the thing out of the way.
So this is running on the right
hand side, this is running as Alice and if she sends a message to, I don't know, the guest deck, hello in the element object.
We will see it here on the left hand side.
Right,
yeah, yeah, yeah.
Oh, okay, so chatting with is essentially a
filter for which party - it filters the message list based off of the party that
you were - correct and also when you send it sends to that person. Ah, okay. That's what I read
it as, yeah.
Cool.
Yeah,
any other questions?
So apps are basically
data?
No, in this particular case they're the
treble of the power's
object, the bundle that's to be executed when you open it on a web page and
- and - a URL where you can load it from.
Yeah, but it's a - okay, yeah, I've been trying to follow but - it's been my understanding that they all fall under the scope of tablets,
that's - and then, I mean, this is how I took it.
Like, you could have a weblet, a runlet, a worklet, perhaps being an applet,
what a game, an applet. Yeah, I think the deeper questions that Dan is asking is, is it reasonable to actually send an app to another party and the answer is no -
unless - well,
no, it's
not.
What is reasonable is to send a power's object and a bundle and then ask them to
instantiate the - instantiate the bundle or like install it, install
the bundle locally
with some set of powers, right, and having - like,
sending an app implies
that you're sending your own powers with it on it when it goes, and that's - it's not quite
right, it
really - one thing that came from conversing with Aaron
about this is that I am convinced that we should move that - that
apps should be an opaque token that is useless to send to another party, and that the three parts, the powers that are - the powers of the bundle and the URLs should be captured as internal data to your particular pet team, and it would not stretch over the wire.
So that's what I have more or less set up, and when you press install app,
instead of doing the normal adopt from a package, it's calling into a different sort of thing, it's calling to adopt app inside of the mail, which takes the
bundle and adds your own powers in.
And you know, I think what we'd really want is that instead of giving it all your powers
or dangerous, it makes
its own profile
and gives it that
profile, and
then the app should request whatever it needs
in order to display something.
I just didn't architect the game
that way originally, and didn't have time to change it for this demo. Yeah, that makes more sense, that this pile of data comes in and I say go, and then it says, "Oh, I would
like some air, please, and some water, and some..." Yeah.
Yeah, I did
find it a little obnoxious for working with the profiles explicitly, like, "Oh, I gotta go create a profile so I can make a thing and have it do basic stuff." Like storing references. So I kind of want it to be easier to just have implicit profiles or something, and I'm not super interested in seeing them show up in my inventory, I just want to create a
deck and allow that to receive things. And if that means it needs to have a profile on the back end, then I'm... Yeah, or I want to see the profile and
not the deck or something like that, you know, like...
Yeah, so the thing that I am...
Yeah, this is actually a bit of a struggle for me, but there are properties
of each of these things in the inventory that are hidden in... that are hidden, right? Like, if you have... If you
have a... Like, if you have a... If you have a... If you have a... If you have a... If you have a... If you have a... If you have a... If you have a... If you have a... If you have an eval, it's something that was made from an eval, you can look at... You could conceivably look at the program
behind it, but there's... There's an interplay, a delicate balance between making those addressable and also keeping those sub
properties private to the creator.
So one
thing that I'm
entertaining is the idea of an undeniable meta object in all caps
that would be something that's like invisible and in your inventory that would allow you to interrogate
or something that I created, what was the worker that was created for free for that thing, or what was
the... What are the properties
of the formula behind this
thing if I'm in a position
to know... If I'm in a position where I should have a reference to those things without belaboring, without putting all of those things in your inventory directly since they're incidental, they need to be discoverable, but they do not need to be
directly in your inventory.
There are a number of ways to do that. The first and the most obvious is to just say, "A, if you ask for a thing, I'm going and it needs to have a thing that you didn't express." Well, I'm going to add dash worker and dash hours or whatever pet
name is right next to it whenever you create it, and then you can do whatever you want with those things, but those things that
are deleteable, and you might not want to delete them. You should be able to take a list of every worker, for example. If you're the host, you should have access to every worker, regardless of whether you've given them a name, so that you're
in a position to kill them, basically, or revoke them.
Just manage them as a resource, so I don't yet know what I'm going to land, what we are going to land
on for that user experience, it's a tricky problem.
Another option for that
is to have a log that says, "Hey, I created a thing for you if you want to give it a name, give it a name," and it'll just be in your log forever so that you can
find
it, or there
are any number of other things.
I am here. Cool, thank you. Oh, go ahead. I just have one question. I'm curious as to what this looks like, if you were to send this to me, like, yeah, just interacting
with like,
yeah, I guess
discovering this, like, yeah, I don't know, I'm trying to just wrap my head around the ways in which you might be able to make this application like, discoverable, and then, yeah. Yeah, like, at the first level, it's social, right? It's like, "Hey, Tom, why don't you install Pet Demon, and then I will send you an invitation to connect to me, and then you accept that invitation with your Pet Demon, and then now
you are a novice to this thing, and I'm an expert at this thing up to the point where I can post a game, for example, that I can just feed you messages so that you can get up and running with that game." Okay. Okay.
So, I just have to trust you.
Yeah, and
bootstrapping the trust is, well, that's a
really interesting question, though. You have to trust me. It depends on
what you mean.
The idea of this is that you don't have to trust me all that much.
If I send you a game, you can
run that game, and it's safe to run that game, even if I am your worst
enemy, it would
be a
mistake for you to grant that game access to your local resources that you don't want it to have, that you don't want the party who sent it to you to
have.
But even if you did that, it still limited, right? The app would have to request a
communication channel back to the author. It would have to request
whatever information or capabilities that it's trying to coerce you into giving it, and you are in a position to deny all of those requests.
So, you really have to social
engineer me in giving you.
The idea is that it should
be hard to deceive
you, but it should also be easy to
empower us to have an interesting experience
together without
having to pay a gatekeeper.
>> Cool,
this is really cool.
I really enjoyed this. Thanks Aaron. >> Yeah, this was a lot of fun to build. I'll put the link to the threatly projects presentation somewhere easy to find.
An easy place to find is the meeting notes for this meeting, because they are linked from the calendar invitation, and it would be great to normalize using that as our log for these kinds of links.
>> Cool. >> I'll also put them on the draft PR for this demo and a couple other places so we can find them. >> Quick question, so is
that in the Spirely demo, does
that use Tor?
>> The Spirely presentation that I'm referring to is a slide show with sketches of what an app could
look like.
>> Okay, I think I have a reminder. They have implemented a large portion of this, but I haven't seen it, and also confirmed that my understanding is that they were going to bootstrap off of Tor. >> Yeah, I'll find the code that I'm referring to and I played around with a little while back, but yeah, I think it
demonstrated a lot of the cool properties that were trying to get in the end of, but I definitely had a set up Tor, the chat was working over Tor.
>> Yeah, we, Aaron and I have done some
exploration of Tor as a possible way to bootstrap connectivity in a peer-to-peer fashion, and of
course, bootstrap is the emphasis it isn't a complete solution, and we're
investigating others. I've been investigating tail scale as one way to enable peer-to-peer connectivity, for example, and had some success with that, basically I'm going to try to get to the point where I'm going to try as quickly, to as quickly, I am trying to as quickly as possible get to the point where the pet demon can connect over TCP, bear TCP TCP, as a place
to start having a bare
TCP connection is a good place to start for also forwarding it over Tor. >> Yeah, I remember over the, a little while back, that being a hot button issue, and yeah, I still had a lot of, I still have a lot to grok, but I definitely feel out about it.
>> Yeah. >> I think that Aaron and I have, collectively, somehow
found a way to bootstrap a Tor plugin that does not require the user to separately go off and install Tor.
Aaron found a, is it Granix, I think the name of the package, it isn't, is very dusty. It's very dusty, but we did manage to get it to the point where we could get a Tor out of NPM without
requiring the user to install it and set it up itself itself.
>> Well, and then I went a little bit further and I wrote a partial Tor client in TypeScript.
>> Naturally. >> Yeah, I don't want to mess around with spread of the goblin tunnel, end up spending a few hours
like playing around with racket, and yeah, I want to avoid that.
Just last question, that grain package, I almost forgot
this. >> Yeah. >> So, I didn't really dive in there deep, but it seems
like that's just a wrapper around CAPTP, but
could you give me a quick? >> No, the grain is an observable store, so you can throw data in there, you can subscribe to data
value, and then it
has some conveniences for talking over a CAPTP or for creating a remote reference for talking over a CAPTP,
so then you can watch state
change across the serialization layer. So like on the
back end, the game that I was demonstrating
is using that to hold its internal state, and so then the UI can subscribe to that state, and when the state changes, the UI can update itself. >> Okay, cool.
So it's not, you know, it's like 150 lines or something, there's not a lot going on just that it's storing a value, and you can subscribe to the value change, and then it has an interface that's
convenient for working with CAPTP. >> Okay, well, I'm sure I won't have any quite, I'm sure that clears everything up for me.
>> It is, it is simple, I assure you, if you read it.
>> That was useful, and just in terms of figuring
out like the role it played, so thank you.
>> Yeah, so if you don't have a user interface, it's not super necessary, but when you have a user interface, you want to know what the state looks like now.
But, you know, so you need to track, you need to know when the state changes, and that's what these kind of observable stores are useful for. >> It's
essentially to help us make reactive user interfaces for state
captured, and like this is, it's an age old question, how do you, how do you sync state between the front end and the back end? Well, with CAPTP, it's, it just becomes like where, how many ends there are, gets a little blurry, there's some state
somewhere connected over a network, and CAPTP is abstracting the entire transport layer of that and all of the multiplexing that you would normally have to do on top of events or whatever, so you can just, here's an object that you can subscribe to and
connect the front and back.
>>
Cool, so like in a gorg, for
example, on the chain, does something very similar to connect
on chain data with DAPs.
>> Just on my screen real quick, on the right hand side, we have the game, the actual game state is living in a separate process than the UI, and I'm sending actions to the back end to do something, and then I'm subscribed to the state from inside the game, and
it, it's saying
like the
cards in front of this player
updated, the
current, the
player whose alternative has changed, and so now the, this, this subscription changed of the cards of the current player, and then the log also changed.
>> Okay, so with the gorg, am I
right in saying that, is it the public, is it the notifier package, would that be taking care of this?
>> Yeah, cool, the gorg notifier is ill, so for
Pet Demon to land in Endo Master, we need to move a gorg notifier into the Endo repository.
>> Presently we're using this thing in Damon called Pubs Up, but that's just temporary until we get
notifier.
>> And when that day comes, the grains package would be built on top of notifier.
>> What is the blocker for moving notifier into the Endo directory?
>> For one, one is time, it's mostly, mostly
willingness to have an engineer work on doing the transfer and making sure that we come off the end, that with the new thing being the only
thing which is a delicate process.
And then also, we may want to trim the notifier package back down to the bits that we want to maintain in going forward, since we're changing the name of the package as an opportunity to change the API a little bit, we don't want to change it too much, because we want to make it easy to migrate.
But the notifier package has two different implementations of notifiers, one of which we regret. So I think
that this might be an
opportunity to drop the
regretted one.
The other factor in play is that at the moment, it has become a burden to keep a gorges decay and the endo repository
in sync changes that
happen in Endo
often accidentally break
subtle interactions in CI and a gorges decay.
Not all of those things are truly breaking changes for end users, but we have over constrained tests, for example, that have to be fixed in concert.
And whenever those breakages happen, it adds long delays to keeping the two repositories in sync.
We are in the midst of a very prolonged attempt to sync Endo with a gorges decay due to a very long list of incompatibilities that cropped up while we weren't looking.
And because of that, there's a tension
to keep the notifier in a gorges decay. There's even pressure to move everything in Endo into a gorges decay so that we don't have to deal with the synchronization problem.
I'm pushing to keep the endo repository separate, and one of the compromises is likely to happen in the next few weeks is that we may begin running a gorges decay canary integration tests in Endo PRs so that endo changes have to be aggregated on compatibility with a gorges decay, which is a compromise, but we do need to be able to make progress on these two things concurrently.
Yeah, I said that, because
before modable, the excess engine, a gorges kind of running that, how do I say, that gets embedded directly in the SDK rather
than the excess ex-snap stuff is not entrained by Endo directly or indirectly. In the gorges
decay, I was just wondering about, because a gorges decay has an ex-snap package
which wraps a,
which is a JavaScript wrapper for a native C excess binding.
The native C binding, it's not in the a gorges decay, it's entrained as a sub-module, but they're virgin pinned anyway. Okay. Yeah, I didn't know if there was any similarities between what's going on there and then... Oh yeah.
Yeah, there
certainly are, there certainly. Cool.
And there is, when there's something... I see Sala's question about grains.
Yeah.
So I'm
trying to figure out how to best put
it.
So is a grain, is a grain more like a proxy representation of states from different sources with different ways of them being updated?
And it's really an
object or sorry, it's a tree of
particular
properties or... Let me say that a single grain corresponds roughly to a JavaScript property, right?
So if you have a value of an object and we look at the properties of the descriptor, it has a getter and a setter, right?
Yeah. A grain corresponds to a value that can be get or set. In addition to get and set, it also has observer functions
which make it possible to subscribe to the changes. Does that make sense?
Yeah, and in that sense, could what it gets
or sets be more than one
property as an object, like a key value map or is it just primitive values?
So I will let Aaron ask about the answer for the concrete. It makes no distinction, but a single grain
does not... If you put an object in there, it's not observing any of its properties or something. It's just when you set a new value, it reports to any subscribers that it changed. But there is... You can make a
grain map where you can
start composing multiple
grains into
another, you know, into an object grain and whenever those child properties change, it will update. And then there's some other utilities for like, "Hey, I want that grain, that grain, I'm using a composed value and it's going to update when any of those child dependency grains update." Right. And then your UI would basically subscribe to the grain and
know what changes happen. So it's kind of externalizing and adding a lot more utility to react state, for instance. Yeah, it does integrate with react really well. And while grain doesn't entrain KEPDP, it has a couple of helper interfaces for it. And it allows you
to take a remote reference of a grain without subscribing to it. And if you indicate that that's a grain map, you can
meaning it's composed of many
grains. You can
get the sub grain.
So you can hold this object that represents a remote
data store and then you can, when you want to, subscribe to it or subscribe to a sub-value of it as needed and then unsubscribe. So that's really useful in React, if I have, certainly I'm rendering a component, I want to subscribe to the value. And then when we're just trying to component, I just unsubscribe from the value. And it's really, you know, it
looks like three lines of code in React.
And is it one of
the intents to make sure that
unless, you know, where the
grain, you know, the value is coming from, the
grain itself does not give you that. So it's kind of like a opaque
representation.
So in a sense, I cannot use a grain to know where the information is coming from, whatever information is given to me next to the grain is all I have to work with.
That sounds right to me, yeah.
Yeah.
All right. Thanks.
Oh, where's the name grain?
Where is that? Yeah, it's, the notion is that one grain is like one atom, you can't really go smaller than that. It's like one piece of capability that you're handing someone. It's literally the bottom of granularity.
Yeah.
And we're, I guess, adopting that term from sandstorm, the sandstorm used the term grain to refer to, like, one contained
element.
Okay, cool.
Just, yeah, new terminology to, I mean, you got to pick a word and I like that one. No, I think it's great. I, no, no, I think it makes sense, you know, and I didn't, I didn't think
that you pulled that out of thin air, that's the way I asked, so thank you. Hold that out of a sandstorm, very thick air, I think, yeah.
Oh, a grain, sandstorm
is a, you know, got a lot of grains to sand.
Cool.
All right.
Well, let's call it, that was a fantastic demo, looking forward to gradually merging bits and pieces of this into, into, into the demon and also I created a playground repository under endo. I have not yet, I mean, it's an empty repository at this point, I don't want to push on a particular structure for it, but maybe one directory per tablet, for
example, would be one way to look at it. It was
a dumping ground for poorly engineered ad hoc, unmetamed, constantly breaking tablets.
Yeah, well, one thing that's neat about the UI for the, the pet name demon is
you don't need to have just one, you can run any of them. And as long as they correctly talk to the pet demon API, you can have different ways of looking at the thing. Yeah, go ahead. Yeah, sorry about that.
Maybe I was distracted and I wasn't paying attention. Sorry, but did we discuss the subdomains on that?
Oh, gosh, we have in the past, not on this call, we
are, thank you for bringing it up.
Aaron, Aaron informed me that you had brought up that the subdomains issue doesn't work in Safari.
We also, Aaron also independently discovered that it doesn't provide the same origin confinement that we need either.
So
stay tuned
the, yeah,
whatever we, the solution we have using local host subdomains is going to work into a limited extent for a limited amount of time in order to let us bootstrap, but it is not as confined as it needs to be.
Could we explore the idea of having a proxy where you could either
have the subdomain where you could have the proxy slash the code, you know, the hash or. There are a whole bunch
of online services.
There are a whole bunch of, a lot of, a lot of, a lot of domains mapped to wildcards on local host.
We could make the pet demon configurable to the extent that you could decide what your TLD for
endo was going to be, and we could also provide like an endo app domain
or something like that.
It can also be an
app like a, what do they, what do they call the,
what are these packaged browser apps.
And we wouldn't need to worry about serving on local hosts.
Yeah, sorry
Safari gives one two seven zero zero one.
The behavior needed for
development, it doesn't get zero zero zero zero.
And so, so by IP you can't have a subdomain, but you could have a sub route, like a route basically as opposed. Well, yeah, you could do that, but then you wouldn't have same origin isolation for each of your weblets. You'd basically be able to run one thing at a time. And that one thing at a time, at a time, you would be able to run one thing. You can't, it would, you'd have to sanitize your local storage, et cetera, whenever you transition to something
else. Yeah, as Aaron mentioned, I was really excited about the local host thing because it made it possible to bootstrap the team and without having to build out a shell application, those shell applications come with lots of different trade offs and lots of ways to do them.
I did in January of this year, do an extensive study of socket supply code, which I think is worth revisiting.
How about Docker,
like a Dev container with, you
know, just, it could be used either
in VS code for development and, you know, gives you a Linux and
Linux of, you know, URLs?
I'm not sure. You'd still have to have a name, like one, one, one reason, almost reasonable
solution is run bind, run bind locally, and then you could have a bind configuration that just explicitly maps some domain of our choosing to
127.01 for all of its, and then pass through to the
underlying Internet DNS substrate.
That would make it possible to have a trustless domain
locally.
The, and as Aaron mentioned, you could also run an electron app that has, and with electron apps, you can use, this was, this was the first idea was to use an electron app because you can create custom URL schemes, much like the way extensions run on the web, in a web browser, you can create a custom,
would have like a hash, a
hash domain for under like the endo colon slash slash
protocol, that would be confined, it would
be confined just as well as a web extension.
There are lots and lots of options, I'm actually really attracted
to leaving this virtual host in place in the pet demon repository, if only because it's super easy to get up and running, even if it's not super secure.
Yeah I do appreciate that, but what I'm thinking
of is not testing in Safari, and you know, we know Safari is full surprises, so if the development experience makes it hard to test while prototyping in
Safari, then maybe a different way to test against Safari
could be worth exploring. Yeah, yeah, one thing I think that we could definitely do for that is a wildcard, an actual
certificate authority based wildcard domain, and for development it would be fine assuming that you trust the publisher of the domain, which you probably will, and it would be really easy to set up, we could just add an environment variable with the deep respect, and
then it would use that to generate
URLs. Yeah, that
sounds simple when you have configuration or as long as you have to set
up, so yeah.
Okay, thanks. A really long time ago, Muji offered that he hosts a 127.00 wildcard, I don't remember what it is though, it was local.something, we could just do that, or we could use up one of our domains that we have reserved for Endo stuff, like I don't recall whether we registered to Endo.app, but that would be a reasonable place to put it, I think too. All right, thank you.
All right, cool, and now it's a wrap. See you. Thanks again. Yes.
Recording stuff. stop.