// @ts-check
/// <reference types="cypress" />

import { capitalize } from "../../utils/capitalize"

describe("Capitalize", () => {
  it('should equal "Fabien"', () =>
    ["fabien", "FABIEN", "faBien"].forEach((string) =>
      expect(capitalize(string)).to.equal("Fabien"),
    ))
})
