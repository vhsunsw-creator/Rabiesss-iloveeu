function openLetterWithExplosion(envelope) {
  const card = document.getElementById("card");

  // open flap
  envelope.classList.add("open");

  // small delay so flap opens visually
  setTimeout(() => {
    // create exploding hearts
    createFloatingHearts(envelope.offsetLeft + 20, envelope.offsetTop + 20, 25);

    envelope.remove(); // remove envelope after flap opens

    // show current letter
    const div = document.createElement("div");
    div.className = "letter";
    div.innerText = letters[envelopeIndex];
    card.appendChild(div);

    envelopeIndex++;

    if(envelopeIndex < letters.length) {
      setTimeout(showEnvelope, 800);
    } else {
      setTimeout(showFinalCinematic, 1200);
    }
  }, 400); // flap open duration
}
