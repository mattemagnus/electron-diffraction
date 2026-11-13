# Elektrondiffraktion

En fristående, statisk webbsida för fysikundervisning. Den behöver ingen installation, byggprocess eller server:

1. Öppna `index.html` i en webbläsare, eller publicera projektmappen som en GitHub Pages-webbplats.
2. Ändra undervisningstexterna och materialets gitterplansavstånd i pikometer i [`data/lesson.js`](data/lesson.js).
3. Ändra reglagens standardvärden, fysikaliska konstanter, diffraktionsordning eller bildförstoring i [`data/physics.js`](data/physics.js).
4. Ändra gränssnitt och layout i [`index.html`](index.html) och [`styles.css`](styles.css).

## Fysikmodell

Våglängden beräknas med den relativistiska de Broglie-relationen för en elektron som accelererats genom spänningen \(V\):

\[
\lambda = \frac{h}{\sqrt{2m_e eV\left(1+\frac{eV}{2m_e c^2}\right)}}.
\]

Första ordningens diffraktion följer Braggs lag \(2d\sin\theta=\lambda\). Den beräknade radien på skärmen är \(r=L\tan(2\theta)\). Spänningsreglaget går från 0 till 10 000 V. Vid 0 V accelereras inga elektroner, så våglängden är odefinierad. Startavståndet till skärmen är 130 mm och kolmodellen har gitteravstånden d₁ = 123 pm och d₂ = 213 pm. Bilden förstorar radierna för att göra dem synliga; våglängden och radien i modellen beräknas ändå från valda fysikaliska värden.

Steg 02, om hur kristallen sprider vågorna, innehåller också en illustration av grafitens hexagonala nät och de två familjerna av gitterplan. Illustrationernas texter, etiketter och avstånd hämtas från [`data/lesson.js`](data/lesson.js).

## Publicera på GitHub Pages

Lägg upp filerna i ett GitHub-repo. Välj sedan **Settings → Pages**, ange publicering från `main` och mappen `/ (root)`, och spara. Alla sökvägar är relativa så att sidan fungerar på både en användarsida och en projektsida.
