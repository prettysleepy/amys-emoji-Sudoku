const fields = ["adjective","animal","adjective","noun","verbEd","verbIng","adjective","adjective","onomatopoeia","verb","interjection","noun","adverb","adjective","pluralNoun","pluralNoun","adjective","noun","adjective","verb","place","adjective","profession","adjective","food","noun","adjective","verbEd","exclamation","verbIng","noun","adverb"];

const inputs = document.getElementById("inputs");

fields.forEach((f,i)=>{
  let input=document.createElement("input");
  input.placeholder=f;
  input.id=f+i;
  inputs.appendChild(input);
});

function v(id){ return document.getElementById(id).value || "["+id+"]"; }

function generateStory(){
let i=0;
let story=`Did you hear about the ${v("adjective"+i++)} ${v("animal"+i++)}?

Before I could answer, a ${v("adjective"+i++)} ${v("noun"+i++)} ${v("verbEd"+i++)} past us, ${v("verbIng"+i++)} ${v("adjective"+i++)} music. Suddenly, there was a loud ${v("adjective"+i++)} ${v("onomatopoeia"+i++)} that made us both ${v("verb"+i++)}.

${v("interjection"+i++)}! I yelled, waving my ${v("noun"+i++)} at them ${v("adverb"+i++)}.

Suddenly, the sky turned ${v("adjective"+i++)} and it started raining ${v("pluralNoun"+i++)} and ${v("pluralNoun"+i++)}!

Well, this is just ${v("adjective"+i++)}! Now my ${v("noun"+i++)} is all ${v("adjective"+i++)}.

We decided this was the perfect time to ${v("verb"+i++)} all the way to the ${v("place"+i++)}. Along the way, we met a ${v("adjective"+i++)} ${v("profession"+i++)} who offered us ${v("adjective"+i++)} ${v("food"+i++)}.

By the end of the day, we were covered in ${v("noun"+i++)} but agreed it was the most ${v("adjective"+i++)} adventure ever.

Same time tomorrow?

I ${v("verbEd"+i++)} and said, ${v("exclamation"+i++)}. Yes, but only if I can bring a ${v("verbIng"+i++)} ${v("noun"+i++)}.

And we both lived ${v("adverb"+i++)} ever after.

The end.`;

document.getElementById("story").innerText=story;
}
