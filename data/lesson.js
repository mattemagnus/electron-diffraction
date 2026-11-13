// Redigera den här filen för att ändra undervisningstexter och materialets gitterplan i pm.
window.LESSON = {
  intro:
    "Vad händer när elektroner träffar en kristall? Eftersom elektroner också har vågegenskaper sprids de i bestämda riktningar. Utforska hur spänning och avstånd påverkar ringarna på skärmen.",
  rings: [
    { spacingPm: 123, label: "d₁", planeAngleDeg: 30, color: "#77e3cc" },
    { spacingPm: 213, label: "d₂", planeAngleDeg: 60, color: "#8daaff" }
  ],
  patternCaption: "Mönstret är förstorat för att ringarna ska synas tydligt.",
  modelNote:
    "Modell: polykrystallint kol med två gitteravstånd. Ringradierna är förstorade i illustrationen.",
  voltageHint: "Högre spänning ger snabbare elektroner och kortare våglängd.",
  distanceHint: "Längre till skärmen gör ringarna större, men ändrar inte våglängden.",
  question: "Vad händer med ringarnas storlek om du ökar spänningen?",
  crystalTitle: "Grafitens hexagonala atomplan",
  crystalIntro:
    "Kolatomerna bildar ett hexagonalt nät. Olika familjer av parallella gitterplan ger avstånden d₁ och d₂ som syns i diffraktionsmönstret.",
  crystalNote:
    "De färgade parallella linjerna visar gitterplan och dubbelpilen mäter avståndet mellan dem. Atomnät och planriktningar är schematiskt skalenliga.",
  steps: [
    {
      number: "01",
      title: "Elektroner får fart",
      text: "Spänningen accelererar elektronerna. Deras våglängd beror på rörelsemängden."
    },
    {
      number: "02",
      title: "Kristallen sprider vågorna",
      text: "Atomplanen sprider elektronen. Vågor från många plan interfererar med varandra."
    },
    {
      number: "03",
      title: "Ljusa ringar uppstår",
      text: "För vissa vinklar förstärker vågorna varandra. En kristall med slumpmässiga riktningar ger ringar."
    }
  ],
  formulaExplanation:
    "Braggs lag bestämmer vilken spridningsvinkel θ som ger förstärkning (här första ordningen, n = 1). Skärmens radie r beror dessutom på avståndet L mellan kristallen och skärmen.",
  footer: "En förenklad illustration för fysikundervisning."
};
