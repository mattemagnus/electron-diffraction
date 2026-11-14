# Elektrondiffraktion

En fristående, statisk webbsida för fysikundervisning. Den behöver ingen installation, byggprocess eller server:

1. Öppna `index.html` i en webbläsare, eller publicera projektmappen som en GitHub Pages-webbplats.
2. Ändra undervisningstexterna och materialets gitterplansavstånd i pikometer i [`data/lesson.js`](data/lesson.js).
3. Ändra reglagens standardvärden, fysikaliska konstanter, diffraktionsordning eller bildförstoring i [`data/physics.js`](data/physics.js).
4. Ändra gränssnitt och layout i [`index.html`](index.html) och [`styles.css`](styles.css).

## Fysikmodell

Våglängden beräknas med den relativistiska de Broglie-relationen för en elektron som accelererats genom spänningen \(U_a\). Den kinetiska energin är \(E_k=eU_a=(\gamma-1)m_ec^2\), där \(\gamma=1/\sqrt{1-v^2/c^2}\). Rörelsemängden är \(p=\gamma m_ev=m_ec\sqrt{\gamma^2-1}\) och därmed:

\[
\lambda = \frac{h}{p} = \frac{h}{m_ec\sqrt{\gamma^2-1}}.
\]

Första ordningens diffraktion följer Braggs lag \(2d\sin\theta=\lambda\). Ringens diameter på skärmen beräknas som \(D=2L\tan(2\theta)\). Spänningsreglaget går från 0 till 10 000 V. Vid 0 V accelereras inga elektroner, så våglängden är odefinierad. Startavståndet till skärmen är 130 mm och kolmodellen har gitteravstånden d₁ = 123 pm och d₂ = 213 pm. Bilden förstorar ringarna för att göra dem synliga; våglängden och diametern i modellen beräknas ändå från valda fysikaliska värden.

Steg 02, om hur kristallen sprider vågorna, innehåller också en illustration av grafitens hexagonala nät och de två familjerna av gitterplan. Illustrationernas texter, etiketter och avstånd hämtas från [`data/lesson.js`](data/lesson.js).

## Publicera på GitHub Pages

Lägg upp filerna i ett GitHub-repo. Välj sedan **Settings → Pages**, ange publicering från `main` och mappen `/ (root)`, och spara. Alla sökvägar är relativa så att sidan fungerar på både en användarsida och en projektsida.
