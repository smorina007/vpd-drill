/**
 * ÇMIMET ORIENTUESE PËR SHPIM PUSI — €/metër
 * ------------------------------------------------------------
 * Plotësoni këtu çmimet tuaja (min–max për metër) për çdo lloj terreni.
 * Sa kohë që vlera është `null`, vlerësuesi NUK shfaq çmim — vetëm
 * përmbledhjen dhe butonin "Merr ofertë të saktë".
 *
 * Shembull:  forte: { min: 40, max: 60 },
 */
export type Terreni = 'forte' | 'bute' | 'perzier' | 'panjohur'

export const CMIMI_PER_METER: Record<Exclude<Terreni, 'panjohur'>, { min: number; max: number } | null> = {
  forte: null, // Terren i fortë (shkëmbor)
  bute: null, // Terren i butë (argjilë, rërë)
  perzier: null, // Terren i përzier
}

/** Monedha që shfaqet pranë çmimit */
export const MONEDHA = '€'
