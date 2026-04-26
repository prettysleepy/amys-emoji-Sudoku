const fields = [
  { id: "adjective0", label: "Adjective", placeholder: "sparkly" },
  { id: "animal1", label: "Animal", placeholder: "confused llama" },
  { id: "adjective2", label: "Adjective", placeholder: "wobbly" },
  { id: "noun3", label: "Noun", placeholder: "pickle jar" },
  { id: "verbEd4", label: "Verb ending in -ed", placeholder: "moonwalked" },
  { id: "verbIng5", label: "Verb ending in -ing", placeholder: "juggling" },
  { id: "adjective6", label: "Adjective", placeholder: "jazzy" },
  { id: "adjective7", label: "Adjective", placeholder: "thunderous" },
  { id: "onomatopoeia8", label: "Onomatopoeia", placeholder: "kaboom" },
  { id: "verb9", label: "Verb", placeholder: "giggle" },
  { id: "interjection10", label: "Interjection", placeholder: "Yikes" },
  { id: "noun11", label: "Noun", placeholder: "rubber chicken" },
  { id: "adverb12", label: "Adverb", placeholder: "dramatically" },
  { id: "adjective13", label: "Adjective", placeholder: "purple" },
  { id: "pluralNoun14", label: "Plural noun", placeholder: "cupcakes" },
  { id: "pluralNoun15", label: "Plural noun", placeholder: "marshmallows" },
  { id: "adjective16", label: "Adjective", placeholder: "ridiculous" },
  { id: "noun17", label: "Noun", placeholder: "backpack" },
  { id: "adjective18", label: "Adjective", placeholder: "soggy" },
  { id: "verb19", label: "Verb", placeholder: "dance" },
  { id: "place20", label: "Place", placeholder: "waffle museum" },
  { id: "adjective21", label: "Adjective", placeholder: "mysterious" },
  { id: "profession22", label: "Profession", placeholder: "space dentist" },
  { id: "adjective23", label: "Adjective", placeholder: "crispy" },
  { id: "food24", label: "Food", placeholder: "spaghetti tacos" },
  { id: "noun25", label: "Noun", placeholder: "glitter" },
  { id: "adjective26", label: "Adjective", placeholder: "legendary" },
  { id: "verbEd27", label: "Verb ending in -ed", placeholder: "snorted" },
  { id: "exclamation28", label: "Exclamation", placeholder: "Holy guacamole" },
  { id: "verbIng29", label: "Verb ending in -ing", placeholder: "tap-dancing" },
  { id: "noun30", label: "Noun", placeholder: "cheeseburger" },
  { id: "adverb31", label: "Adverb", placeholder: "happily" }
];

const inputs = document.getElementById("inputs");

fields.forEach((field) => {
  const wrapper = document.createElement("div");
  wrapper.className = "field";

  const label = document.createElement("label");
  label.setAttribute("for", field.id);
  label.textContent = field.label;

  const input = document.createElement("input");
  input.id = field.id;
  input.placeholder = field.placeholder;
  input.autocomplete = "off";

  wrapper.append(label, input);
  inputs.appendChild(wrapper);
});

function v(id) {
  return document.getElementById(id).value.trim() || document.getElementById(id).placeholder;
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const story = `“Did you hear about the ${v("adjective0")} ${v("animal1")}?” they asked.

Before I could answer, a ${v("adjective2")} ${v("noun3")} ${v("verbEd4")} past us, ${v("verbIng5")} ${v("adjective6")} music. Suddenly, there was a loud ${v("adjective7")} ${v("onomatopoeia8")} that made us both ${v("verb9")}.

“${v("interjection10")}!” I yelled, waving my ${v("noun11")} at them ${v("adverb12")}.

Suddenly, the sky turned ${v("adjective13")} and it started raining ${v("pluralNoun14")} and ${v("pluralNoun15")}!

“Well, this is just ${v("adjective16")}! Now my ${v("noun17")} is all ${v("adjective18")}.”

We decided this was the perfect time to ${v("verb19")} all the way to the ${v("place20")}. Along the way, we met a ${v("adjective21")} ${v("profession22")} who offered us ${v("adjective23")} ${v("food24")}.

By the end of the day, we were covered in ${v("noun25")} but agreed it was the most ${v("adjective26")} adventure ever.

“Same time tomorrow?” my friend asked.

I ${v("verbEd27")} and said, “${v("exclamation28")}. Yes, but only if I can bring a ${v("verbIng29")} ${v("noun30")}.”

And we both lived ${v("adverb31")} ever after.

The end.`;

  document.getElementById("story").innerText = story;
  document.getElementById("storyBox").classList.remove("hidden");
  document.getElementById("storyBox").scrollIntoView({ behavior: "smooth", block: "start" });
});
