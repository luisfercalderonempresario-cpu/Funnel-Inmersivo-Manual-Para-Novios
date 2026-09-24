/**
 * Contexto™ S08-A — Phase Content Library
 *
 * Deterministic approved copy for the 4 cycle phases.
 * Follows the 6 mandatory blocks:
 * 1. TU CONTEXTO DE HOY
 * 2. MODO DE CONEXIÓN
 * 3. HOY PUEDES PROBAR
 * 4. EVITA
 * 5. SI NO SABES QUÉ HACER
 * 6. PRINCIPIO CONTEXTO™ (Common)
 *
 * Respects strict guardrails:
 * - No emotional predictions
 * - No diagnostic claims
 * - No sexualized suggestions on ovulation
 * - No causal assumptions ("she's acting like this because of her period")
 * - Female autonomy always preserved ("Su voz siempre manda")
 */

import { EstimatedPhase } from "../utils/cycleCalculations";

export interface PhaseContentBlock {
  phaseName: string;
  contextToday: string[];
  connectionMode: {
    title: string;
    text: string;
  };
  tryToday: string;
  avoid: string[];
  ifLostWhatToDo: string;
}

export const COMMON_CONTEXTO_PRINCIPLE = {
  title: "PRINCIPIO CONTEXTO™",
  lines: [
    "Conocer el contexto no significa asumir cómo se siente.",
    "Significa tener una pieza más de información antes de responder.",
  ],
};

export const PHASE_CONTENT_MAP: Record<NonNullable<EstimatedPhase>, PhaseContentBlock> = {
  menstrual: {
    phaseName: "Fase Menstrual",
    contextToday: [
      "Durante la menstruación pueden aparecer cambios físicos como cólicos, cansancio, molestias o variaciones en la energía.",
      "Eso no significa que sepamos cómo se siente hoy.",
      "Puede sentirse bien, incómoda, con energía, agotada o simplemente como cualquier otro día.",
    ],
    connectionMode: {
      title: "Atención sin asumir.",
      text: "Observa cómo está y deja que ella marque qué necesita hoy.",
    },
    tryToday:
      "Hazle una pregunta sencilla antes de intentar ayudar:\n«¿Cómo te estás sintiendo hoy?»",
    avoid: [
      "Dar por hecho que cualquier cambio tiene que ver con su periodo.",
      "El contexto puede orientar tu atención, no explicar automáticamente lo que ocurre.",
    ],
    ifLostWhatToDo:
      "«¿Hay algo que pueda hacer para que estés más cómoda o prefieres que simplemente esté contigo?»",
  },

  follicular: {
    phaseName: "Fase Folicular",
    contextToday: [
      "Después de la menstruación comienza la fase folicular y el cuerpo continúa avanzando hacia la ovulación.",
      "Durante estos días ocurren cambios hormonales y fisiológicos, pero no existe una forma única en que ella deba sentirse.",
      "Su energía, ánimo y necesidades pueden depender de muchas otras cosas que están ocurriendo en su vida.",
    ],
    connectionMode: {
      title: "Curiosidad antes que conclusiones.",
      text: "No necesitas interpretar cada cambio. Puedes interesarte por cómo está hoy.",
    },
    tryToday:
      "Busca un pequeño momento para conectar sin intentar dirigirlo.\nPregúntale cómo estuvo realmente su día y escucha antes de responder.",
    avoid: [
      "Convertir la fase en una expectativa.",
      "Estar en determinada parte del ciclo no significa que tenga que sentirse de determinada manera.",
    ],
    ifLostWhatToDo: "«¿Cómo estás de verdad hoy?»",
  },

  ovulatory: {
    phaseName: "Fase Ovulatoria",
    contextToday: [
      "Esta estimación sitúa el ciclo cerca de la ovulación, un momento en el que pueden producirse cambios hormonales y físicos.",
      "Eso no permite predecir su ánimo, deseo, energía ni cómo quiere relacionarse contigo.",
      "Lo más útil sigue siendo observar, preguntar y escuchar cómo está ella hoy.",
    ],
    connectionMode: {
      title: "Presencia sin expectativas.",
      text: "Disfruta la conexión que exista hoy sin asumir cómo debería sentirse o qué debería querer.",
    },
    tryToday:
      "Crea un momento pequeño de conexión que no exija nada a cambio.\nPuede ser conversar, compartir algo juntos o simplemente prestarle atención.",
    avoid: [
      "Usar la fase para anticipar su deseo, ánimo o comportamiento.",
      "Una estimación del ciclo nunca reemplaza lo que ella expresa.",
    ],
    ifLostWhatToDo: "«¿Qué te gustaría hacer juntos hoy?»",
  },

  luteal: {
    phaseName: "Fase Lútea",
    contextToday: [
      "Después de la ovulación comienza la fase lútea.",
      "En algunos ciclos pueden aparecer cambios físicos o emocionales antes de la siguiente menstruación; en otros pueden ser leves o no aparecer.",
      "Si hoy notas algo diferente, no significa que el ciclo sea necesariamente la explicación.",
      "Puede ser una pieza del contexto. No toda la historia.",
    ],
    connectionMode: {
      title: "Comprensión antes que interpretación.",
      text: "Si notas un cambio, intenta conocer qué está pasando antes de decidir qué significa.",
    },
    tryToday:
      "Si la notas diferente, cambia:\n«¿Qué le pasa?»\npor:\n«¿Cómo te sientes hoy?»",
    avoid: [
      "«Debe ser por su periodo.»",
      "No reduzcas lo que siente a una fase del ciclo.",
    ],
    ifLostWhatToDo:
      "«¿Quieres que te escuche, que te ayude con algo o prefieres tener un poco de espacio?»",
  },
};

/**
 * Returns phase content safely. Defaults to luteal if phase is not explicitly mapped.
 */
export function getPhaseContent(phase: EstimatedPhase): PhaseContentBlock {
  if (phase && PHASE_CONTENT_MAP[phase]) {
    return PHASE_CONTENT_MAP[phase];
  }
  return PHASE_CONTENT_MAP.luteal;
}
