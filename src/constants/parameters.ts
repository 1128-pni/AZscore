export const CARDIAC_PARAMETERS = [
  'Transverse Cardiac',
  'Left Atrial',
  'Right Atrial',
  'Left Ventricular',
  'Right Ventricular',
  'Ductus Arteriosus',
  'Foramen Ovale',
  'Aortic Valve',
  'Descending Aorta',
  'Aortic Isthmus',
  'Pulmonary Valve',
  'Left Pulmonary Artery',
  'Right Pulmonary Artery',
] as const;

export type CardiacParameter = typeof CARDIAC_PARAMETERS[number];