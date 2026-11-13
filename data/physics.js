// Fysikmodellens konstanter och beräkningar. Ändra här om modellen ska justeras.
window.PHYSICS = {
  defaults: {
    accelerationVoltageVolts: 2500,
    screenDistanceMeters: 0.13
  },
  constants: {
    planck: 6.62607015e-34,
    electronMass: 9.1093837139e-31,
    elementaryCharge: 1.602176634e-19,
    speedOfLight: 299792458
  },
  diffractionOrder: 1,
  // Förstoringen gör små, verkliga diffraktionsradier synliga på skärmen.
  drawingMagnification: 3.5,

  wavelength(voltageVolts) {
    if (voltageVolts === 0) {
      return null;
    }
    if (voltageVolts < 0) {
      throw new RangeError("Accelerationsspänningen kan inte vara negativ.");
    }
    const { planck, electronMass, elementaryCharge, speedOfLight } = this.constants;
    const kineticEnergy = elementaryCharge * voltageVolts;
    const momentum = Math.sqrt(
      2 * electronMass * kineticEnergy *
      (1 + kineticEnergy / (2 * electronMass * speedOfLight ** 2))
    );
    return planck / momentum;
  },

  ringRadius(spacingMeters, wavelengthMeters, screenDistanceMeters) {
    const sineTheta =
      this.diffractionOrder * wavelengthMeters / (2 * spacingMeters);
    if (sineTheta >= 1) {
      return null;
    }
    const theta = Math.asin(sineTheta);
    if (theta >= Math.PI / 4) {
      return null;
    }
    return screenDistanceMeters * Math.tan(2 * theta);
  }
};
