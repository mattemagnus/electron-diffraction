(function () {
  "use strict";

  const lesson = window.LESSON;
  const physics = window.PHYSICS;
  const byId = (id) => document.getElementById(id);
  const voltage = byId("voltage");
  const distance = byId("distance");
  const rings = byId("rings");
  const center = 240;
  const maxVisibleRingRadius = 215;
  const voltageFormatter = new Intl.NumberFormat("sv-SE");

  voltage.value = String(physics.defaults.accelerationVoltageVolts);
  distance.value = String(physics.defaults.screenDistanceMeters);

  byId("intro-copy").textContent = lesson.intro;
  byId("pattern-caption").textContent = lesson.patternCaption;
  byId("model-note").textContent = lesson.modelNote;
  byId("voltage-hint").textContent = lesson.voltageHint;
  byId("distance-hint").textContent = lesson.distanceHint;
  byId("question").textContent = lesson.question;
  byId("formula-explanation").textContent = lesson.formulaExplanation;
  byId("footer-text").textContent = lesson.footer;

  lesson.rings.forEach((ring) => {
    const item = document.createElement("span");
    item.className = "key-item";
    const dot = document.createElement("span");
    dot.className = "key-dot";
    dot.style.setProperty("--ring-color", ring.color);
    const description = document.createElement("span");
    description.append(`${ring.label} `);
    const spacing = document.createElement("strong");
    spacing.textContent = `${ring.spacingPm} pm`;
    description.append(spacing);
    item.append(dot, description);
    byId("ring-key").append(item);
  });

  lesson.steps.forEach((step) => {
    const article = document.createElement("article");
    article.className = "step";
    const number = document.createElement("span");
    number.className = "step-number";
    number.textContent = step.number;
    const title = document.createElement("h3");
    title.textContent = step.title;
    const text = document.createElement("p");
    text.textContent = step.text;
    article.append(number, title, text);

    if (step.number === "02") {
      const crystalSection = document.createElement("section");
      crystalSection.className = "crystal-embed";
      crystalSection.setAttribute("aria-labelledby", "crystal-title");
      const crystalTitle = document.createElement("h4");
      crystalTitle.id = "crystal-title";
      crystalTitle.textContent = lesson.crystalTitle;
      const crystalIntro = document.createElement("p");
      crystalIntro.className = "crystal-intro";
      crystalIntro.textContent = lesson.crystalIntro;
      const planeCards = document.createElement("div");
      planeCards.className = "plane-cards";
      planeCards.id = "plane-cards";
      const crystalNote = document.createElement("p");
      crystalNote.className = "crystal-note";
      crystalNote.textContent = lesson.crystalNote;
      crystalSection.append(crystalTitle, crystalIntro, planeCards, crystalNote);
      article.append(crystalSection);
    }

    byId("steps").append(article);
  });

  const svgNamespace = "http://www.w3.org/2000/svg";
  const latticeParameterPm = 246;
  const latticeParameterPx = 42;
  const pixelPerPm = latticeParameterPx / latticeParameterPm;
  const atomRadius = 2.7;
  const bondVectors = [
    { x: 21, y: latticeParameterPx / (2 * Math.sqrt(3)) },
    { x: -21, y: latticeParameterPx / (2 * Math.sqrt(3)) },
    { x: 0, y: -latticeParameterPx / Math.sqrt(3) }
  ];

  function makeSvgElement(name, attributes) {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, String(value));
    });
    return element;
  }

  function drawPlaneCard(ring, index) {
    const figure = document.createElement("figure");
    figure.className = "plane-card";

    const heading = document.createElement("figcaption");
    heading.className = "plane-card-heading";
    const name = document.createElement("h3");
    name.textContent = `Gitterplan ${ring.label}`;
    const spacing = document.createElement("span");
    spacing.textContent = `${ring.label} = ${ring.spacingPm} pm`;
    heading.append(name, spacing);

    const illustration = makeSvgElement("svg", {
      class: "plane-illustration",
      viewBox: "0 0 320 192",
      role: "img",
      "aria-labelledby": `plane-title-${index} plane-description-${index}`
    });
    const title = makeSvgElement("title", { id: `plane-title-${index}` });
    title.textContent = `Hexagonalt grafitplan med gitteravstånd ${ring.label} = ${ring.spacingPm} pm`;
    const description = makeSvgElement("desc", { id: `plane-description-${index}` });
    description.textContent =
      `Hexagonalt nät av kolatomer med parallella markerade gitterplan. En dubbelriktad pil visar avståndet ${ring.spacingPm} pm mellan planen.`;
    illustration.append(title, description);
    illustration.append(makeSvgElement("rect", {
      x: 0, y: 0, width: 320, height: 192, rx: 12, class: "plane-background"
    }));

    const clipId = `plane-clip-${index}`;
    const markerId = `plane-arrow-${index}`;
    const definitions = makeSvgElement("defs", {});
    const clipPath = makeSvgElement("clipPath", { id: clipId });
    clipPath.append(makeSvgElement("rect", {
      x: 0, y: 0, width: 320, height: 192, rx: 12
    }));
    const marker = makeSvgElement("marker", {
      id: markerId,
      markerWidth: 7,
      markerHeight: 7,
      refX: 3.5,
      refY: 3.5,
      orient: "auto-start-reverse",
      markerUnits: "userSpaceOnUse"
    });
    marker.append(makeSvgElement("path", {
      d: "M 0 0 L 7 3.5 L 0 7 z",
      fill: ring.color
    }));
    definitions.append(clipPath, marker);
    illustration.append(definitions);

    const clippedDrawing = makeSvgElement("g", { "clip-path": `url(#${clipId})` });
    const bonds = makeSvgElement("g", { class: "carbon-bonds" });
    const atoms = makeSvgElement("g", { class: "carbon-atoms" });
    const centerX = 160;
    const centerY = 96;
    const basisX = latticeParameterPx / 2;
    const basisY = latticeParameterPx / (2 * Math.sqrt(3));
    const rowY = latticeParameterPx * Math.sqrt(3) / 2;

    for (let i = -6; i <= 6; i += 1) {
      for (let j = -6; j <= 6; j += 1) {
        const x = centerX + i * latticeParameterPx + j * basisX;
        const y = centerY + j * rowY;
        bondVectors.forEach((vector) => {
          bonds.append(makeSvgElement("line", {
            x1: x,
            y1: y,
            x2: x + vector.x,
            y2: y + vector.y,
            class: "carbon-bond"
          }));
        });
        atoms.append(makeSvgElement("circle", {
          cx: x, cy: y, r: atomRadius, class: "carbon-atom"
        }));
        atoms.append(makeSvgElement("circle", {
          cx: x + basisX,
          cy: y + basisY,
          r: atomRadius,
          class: "carbon-atom"
        }));
      }
    }

    const planeAngle = ring.planeAngleDeg * Math.PI / 180;
    const planeDirection = { x: Math.cos(planeAngle), y: Math.sin(planeAngle) };
    const planeNormal = { x: -planeDirection.y, y: planeDirection.x };
    const planeSpacing = ring.spacingPm * pixelPerPm;
    const planeLines = makeSvgElement("g", {
      class: "plane-guides",
      stroke: ring.color
    });
    const lineLength = 400;
    for (let offset = -5; offset <= 5; offset += 1) {
      const shift = offset * planeSpacing;
      const x = centerX + planeNormal.x * shift;
      const y = centerY + planeNormal.y * shift;
      planeLines.append(makeSvgElement("line", {
        x1: x - planeDirection.x * lineLength,
        y1: y - planeDirection.y * lineLength,
        x2: x + planeDirection.x * lineLength,
        y2: y + planeDirection.y * lineLength,
        class: "plane-guide"
      }));
    }

    const dimensionOffset = -planeSpacing / 2;
    const dimensionCenterX = centerX + planeNormal.x * dimensionOffset;
    const dimensionCenterY = centerY + planeNormal.y * dimensionOffset;
    const dimension = makeSvgElement("line", {
      x1: dimensionCenterX - planeNormal.x * planeSpacing / 2,
      y1: dimensionCenterY - planeNormal.y * planeSpacing / 2,
      x2: dimensionCenterX + planeNormal.x * planeSpacing / 2,
      y2: dimensionCenterY + planeNormal.y * planeSpacing / 2,
      class: "plane-dimension",
      stroke: ring.color,
      "marker-start": `url(#${markerId})`,
      "marker-end": `url(#${markerId})`
    });

    clippedDrawing.append(bonds, planeLines, atoms, dimension);
    illustration.append(clippedDrawing);
    figure.append(heading, illustration);
    return figure;
  }

  lesson.rings.forEach((ring, index) => {
    byId("plane-cards").append(drawPlaneCard(ring, index));
  });

  function update() {
    const voltageVolts = Number(voltage.value);
    const distanceMeters = Number(distance.value);
    const wavelengthMeters = physics.wavelength(voltageVolts);

    byId("voltage-output").textContent = `${voltageFormatter.format(voltageVolts)} V`;
    byId("voltage-label").textContent = `${voltageFormatter.format(voltageVolts)} V`;
    byId("distance-output").textContent = `${Math.round(distanceMeters * 1000)} mm`;
    const wavelengthOutput = byId("wavelength-output");
    rings.replaceChildren();
    const centralSpotVisible = wavelengthMeters !== null;
    byId("central-spot").style.display = centralSpotVisible ? "" : "none";
    byId("central-halo").style.display = centralSpotVisible ? "" : "none";

    let visibleRings = 0;
    let ringsOutsideScreen = 0;
    if (wavelengthMeters === null) {
      wavelengthOutput.textContent = "Inte definierad vid 0 V";
      byId("pattern-caption").textContent =
        "Vid 0 V accelereras inga elektroner, så våglängd och diffraktionsmönster är inte definierade.";
      byId("pattern-description").textContent =
        "Vid 0 V accelereras inga elektroner och inget diffraktionsmönster visas.";
    } else {
      wavelengthOutput.textContent = `${(wavelengthMeters * 1e9).toFixed(4)} nm`;
      lesson.rings.forEach((ring) => {
        const radiusMeters = physics.ringRadius(
          ring.spacingPm * 1e-12,
          wavelengthMeters,
          distanceMeters
        );
        if (radiusMeters === null) {
          return;
        }
        const radiusPixels = radiusMeters * 1000 * physics.drawingMagnification;
        if (radiusPixels > maxVisibleRingRadius) {
          ringsOutsideScreen += 1;
          return;
        }
        visibleRings += 1;
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", String(center));
        circle.setAttribute("cy", String(center));
        circle.setAttribute("r", String(radiusPixels));
        circle.setAttribute("class", "diffraction-ring");
        circle.setAttribute("stroke", ring.color);
        circle.setAttribute(
          "aria-label",
          `${ring.label}, gitteravstånd ${ring.spacingPm} picometer, radie ${(radiusMeters * 1000).toFixed(2)} millimeter`
        );
        rings.appendChild(circle);
      });

      const caption = ringsOutsideScreen > 0
        ? visibleRings === 0
          ? "Diffraktionsringar finns, men hamnar utanför den visade delen av skärmen vid den här spänningen."
          : "En eller flera diffraktionsringar hamnar utanför den visade delen av skärmen."
        : visibleRings === lesson.rings.length
          ? lesson.patternCaption
          : visibleRings === 0
            ? "Vid den här spänningen bildas inga diffraktionsringar för de valda gitteravstånden."
            : "Bara gitterplan som uppfyller Braggs lag ger en diffraktionsring vid den här spänningen.";
      byId("pattern-caption").textContent = caption;
      byId("pattern-description").textContent = visibleRings === 0
        ? ringsOutsideScreen > 0
          ? `${ringsOutsideScreen} diffraktionsring${ringsOutsideScreen === 1 ? "" : "ar"} ligger utanför den visade skärmytan.`
          : "En elektron träffar skärmen i mitten, utan diffraktionsringar."
        : ringsOutsideScreen > 0
          ? `En central stråle med ${visibleRings} synlig${visibleRings === 1 ? "" : "a"} ring${visibleRings === 1 ? "" : "ar"} och ${ringsOutsideScreen} ring${ringsOutsideScreen === 1 ? "" : "ar"} utanför skärmytan.`
          : `En central stråle med ${visibleRings} diffraktionsring${visibleRings === 1 ? "" : "ar"}.`;
    }

    const voltageProgress = ((voltageVolts - Number(voltage.min)) / (Number(voltage.max) - Number(voltage.min))) * 100;
    const distanceProgress = ((distanceMeters - Number(distance.min)) / (Number(distance.max) - Number(distance.min))) * 100;
    voltage.style.setProperty("--range-progress", `${voltageProgress}%`);
    distance.style.setProperty("--range-progress", `${distanceProgress}%`);
  }

  voltage.addEventListener("input", update);
  distance.addEventListener("input", update);
  update();
})();
