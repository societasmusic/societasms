// Validate ISRC string
export function validate(isrc) {
    const isrcRegex = new RegExp(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/)
    // Return boolean
    return isrcRegex.test(isrc)
}

// Validate ISRC string
export function parse(isrc) {
    if (!validate(isrc)) throw new Error("Invalid 'isrc'.")
    // Return object
    return {
        country: isrc.slice(0, 2),
        registrant: isrc.slice(2, 5),
        year: Number(isrc.slice(5, 7)),
        designation: Number(isrc.slice(7, 12))
    }
}

// Parse ISRC object to flat string
export function flatten(isrc) {
    if (typeof isrc !== "object" || Array.isArray(isrc) || isrc === null) throw new Error("Parameter should be an object.")
    // Return string
    return `${isrc.country}${isrc.registrant}${isrc.year}${isrc.designation.toString().padStart(5, "0")}`
}

// Generate new ISRC object
export function generate(country, registrant, year, existingIsrcs) {
    // Error handling
    if (!Array.isArray(existingIsrcs)) throw new Error("Parameter should be an array.")
    // Create temporary sorted array with all ISRCs that match params
    let existingIsrcsSorted = []
    existingIsrcs.forEach(e => {
        let parsedIsrc = parse(e)
        if (parsedIsrc.country === country && parsedIsrc.registrant === registrant && parsedIsrc.year === year) {
            existingIsrcsSorted.push(parsedIsrc.designation)
        }
    })
    // Increment designation
    let designation = Number(Math.max(0, ...existingIsrcsSorted)) + 1
    if (designation > 99999) throw new Error("Max designation reached.")
    // Return object
    return { country: country, registrant: registrant, year: year, designation: designation }
}