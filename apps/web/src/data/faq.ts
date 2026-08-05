import type { Locale } from '@nutricycle/shared';
import type { QA } from '@/components/content/faq-accordion';

/**
 * Source: app-content-strategy.md § "Page 6: FAQ" — the question list is
 * the client's; the answers are written from facts already established
 * elsewhere in the project, never invented:
 *
 * - pricing and billing → project-brief.md + legal.ts (migrated Terms)
 * - data handling → legal.ts (migrated Privacy Policy)
 * - features → features.ts, itself from app-content-strategy.md
 *
 * ⚠️ Two answers are hedged on purpose. Offline support and the device
 * matrix are not documented anywhere in the material supplied, and an
 * FAQ that guesses is worse than one that points at support.
 */

export interface FaqGroup {
  id: string;
  title: string;
  icon: 'Smartphone' | 'ShieldCheck' | 'CreditCard' | 'Wrench';
  tint: string;
  items: QA[];
}

const FAQ_GROUPS_ES: readonly FaqGroup[] = [
  {
    id: 'app',
    title: 'Sobre la app',
    icon: 'Smartphone',
    tint: 'bg-luteal-soft text-luteal-ink',
    items: [
      {
        q: '¿Nutricycle es gratis?',
        a: 'Sí. El seguimiento del ciclo, las recetas por fase, el registro diario, el plan semanal, la lista de compras y los artículos están incluidos sin pagar nada. El Plan Hormonal es opcional y desbloquea la asesora con IA sin límite, el predictor de ciclo y las recetas guardadas ilimitadas.',
      },
      {
        q: '¿Qué es la nutrición cíclica?',
        a: 'Es adaptar lo que comés a la fase del ciclo menstrual en la que estás. Tus niveles de estrógeno y progesterona cambian a lo largo del mes, y con ellos cambian tu energía, tu digestión y lo que tu cuerpo aprovecha mejor. En vez de comer igual las cuatro semanas, ajustás los alimentos a lo que tu cuerpo está haciendo esa semana.',
      },
      {
        q: '¿Necesito saber cuánto dura mi ciclo?',
        a: 'No con exactitud. Al configurar la app ingresás la fecha de tu último período y una duración aproximada; si no la sabés, podés empezar con el promedio de 28 días. A medida que registrás tus ciclos, la predicción se ajusta a los tuyos.',
      },
      {
        q: '¿Está en español?',
        a: 'Sí. Nutricycle está en español e inglés, y podés cambiar de idioma cuando quieras desde los ajustes sin perder tu historial ni tu configuración.',
      },
      {
        q: '¿Funciona si mi ciclo es irregular?',
        a: 'Sí, y es uno de los casos para los que fue pensada. Con ciclos irregulares la predicción es menos precisa al principio, pero el registro diario y las recomendaciones por fase siguen funcionando. Cuantos más ciclos registrás, mejor se ajusta. Si tus ciclos son muy irregulares o ausentes, consultá también con un profesional de salud.',
      },
    ],
  },
  {
    id: 'privacidad',
    title: 'Privacidad y datos',
    icon: 'ShieldCheck',
    tint: 'bg-follicular-soft text-follicular-ink',
    items: [
      {
        q: '¿Quién puede ver mis datos de salud?',
        a: 'Nadie más que vos. Los datos del ciclo y los síntomas se usan exclusivamente para generar tus recomendaciones dentro de la app. No se venden, no se comparten con terceros y no se usan con fines publicitarios.',
      },
      {
        q: '¿Mis datos están seguros?',
        a: 'Se aplican medidas de seguridad estándar de la industria, incluida la encriptación de datos en tránsito y en reposo. Ningún método de transmisión por internet es 100% seguro, y así lo indicamos en la Política de Privacidad.',
      },
      {
        q: '¿Puedo borrar mi cuenta y mis datos?',
        a: 'Sí, en cualquier momento. Escribinos a hola@aliciabasurto.com y eliminamos tu cuenta junto con los datos asociados. También tenés derecho a acceder a tus datos, corregirlos y retirar tu consentimiento.',
      },
    ],
  },
  {
    id: 'suscripcion',
    title: 'Suscripción',
    icon: 'CreditCard',
    tint: 'bg-ovulation-soft text-ovulation-ink',
    items: [
      {
        q: '¿Cómo cancelo el Plan Hormonal?',
        a: 'Desde los ajustes de tu cuenta en App Store o Google Play, según el dispositivo donde te suscribiste. La cancelación se hace efectiva al final del período que ya pagaste, y seguís teniendo acceso hasta entonces.',
      },
      {
        q: '¿Puedo restaurar una compra anterior?',
        a: 'Sí. Dentro de la app hay un botón para restaurar compras, que recupera tu suscripción activa en un dispositivo nuevo o después de reinstalar.',
      },
      {
        q: '¿Quién cobra la suscripción?',
        a: 'Apple o Google, según tu dispositivo. Nutricycle no procesa pagos directamente ni almacena datos de tarjetas. Las condiciones de facturación de cada plataforma aplican a tu suscripción.',
      },
      {
        q: '¿Hay plan familiar?',
        a: 'Por ahora no. Nutricycle se suscribe por cuenta individual. Si App Store o Google Play tienen activada la compartición en familia para la app, se aplicarían sus reglas.',
      },
    ],
  },
  {
    id: 'tecnico',
    title: 'Técnico y soporte',
    icon: 'Wrench',
    tint: 'bg-menstrual-soft text-menstrual-ink',
    items: [
      {
        q: '¿En qué dispositivos funciona?',
        a: 'Nutricycle está disponible para iOS y Android. Los requisitos mínimos de versión los muestra la ficha de la app en App Store y en Google Play, que es siempre la fuente actualizada.',
      },
      {
        q: '¿Funciona sin conexión?',
        a: 'Algunas funciones necesitan conexión —la asesora con IA y la sincronización de tu historial, entre ellas—. Si querés confirmar el comportamiento exacto sin datos, escribinos y te lo respondemos.',
      },
      {
        q: '¿Cómo contacto con soporte?',
        a: 'Escribinos a hola@aliciabasurto.com. Con el Plan Hormonal tenés soporte prioritario.',
      },
    ],
  },
] as const;

/**
 * English text, parallel to the Spanish structure above.
 *
 * Text only — ids, icons and tints live once, in FAQ_GROUPS_ES. The getter
 * asserts the two line up, so a question added to one language and not the
 * other fails the build rather than dropping silently off /en.
 *
 * ⚠️ The two hedged answers stay hedged. Offline behaviour and the device
 * matrix are not documented in the supplied material, and an FAQ that
 * guesses in translation is worse than one that points at support.
 */
interface FaqTextEn {
  title: string;
  items: { q: string; a: string }[];
}

const FAQ_TEXT_EN: readonly FaqTextEn[] = [
  {
    title: 'About the app',
    items: [
      {
        q: 'Is Nutricycle free?',
        a: 'Yes. Cycle tracking, recipes by phase, the daily log, the weekly plan, the shopping list and the articles are all included at no cost. The Hormonal Plan is optional and unlocks the AI coach without limits, the cycle predictor and unlimited saved recipes.',
      },
      {
        q: 'What is cyclical nutrition?',
        a: 'It means adapting what you eat to the phase of your menstrual cycle you are in. Your oestrogen and progesterone levels change across the month, and with them your energy, your digestion and what your body makes best use of. Instead of eating the same way for four weeks, you match your food to what your body is doing that week.',
      },
      {
        q: 'Do I need to know how long my cycle is?',
        a: 'Not exactly. When you set the app up you enter the date of your last period and a rough length; if you do not know it, you can start with the 28-day average. As you log your cycles, the prediction adjusts to yours.',
      },
      {
        q: 'Is it available in Spanish?',
        a: 'Yes. Nutricycle is available in Spanish and English, and you can switch language whenever you like from the settings without losing your history or your configuration.',
      },
      {
        q: 'Does it work if my cycle is irregular?',
        a: 'Yes, and it is one of the cases it was designed for. With irregular cycles the prediction is less precise at first, but the daily log and the recommendations by phase still work. The more cycles you log, the better it adjusts. If your cycles are very irregular or absent, do also speak to a health professional.',
      },
    ],
  },
  {
    title: 'Privacy and data',
    items: [
      {
        q: 'Who can see my health data?',
        a: 'Nobody but you. Your cycle and symptom data are used solely to generate your recommendations inside the app. They are not sold, not shared with third parties and not used for advertising.',
      },
      {
        q: 'Is my data secure?',
        a: 'Industry-standard security measures are applied, including encryption of data in transit and at rest. No method of transmission over the internet is 100% secure, and we say so in the Privacy Policy.',
      },
      {
        q: 'Can I delete my account and my data?',
        a: 'Yes, at any time. Write to hola@aliciabasurto.com and we will delete your account along with the associated data. You also have the right to access your data, correct it and withdraw your consent.',
      },
    ],
  },
  {
    title: 'Subscription',
    items: [
      {
        q: 'How do I cancel the Hormonal Plan?',
        a: 'From your account settings in the App Store or Google Play, depending on the device you subscribed on. Cancellation takes effect at the end of the period you have already paid for, and you keep access until then.',
      },
      {
        q: 'Can I restore a previous purchase?',
        a: 'Yes. There is a restore purchases button inside the app, which recovers your active subscription on a new device or after reinstalling.',
      },
      {
        q: 'Who charges for the subscription?',
        a: 'Apple or Google, depending on your device. Nutricycle does not process payments directly and does not store card details. Each platform’s billing conditions apply to your subscription.',
      },
      {
        q: 'Is there a family plan?',
        a: 'Not for now. Nutricycle is subscribed to per individual account. If the App Store or Google Play have family sharing enabled for the app, their rules would apply.',
      },
    ],
  },
  {
    title: 'Technical and support',
    items: [
      {
        q: 'Which devices does it work on?',
        a: 'Nutricycle is available for iOS and Android. Minimum version requirements are shown on the app listing in the App Store and Google Play, which is always the up-to-date source.',
      },
      {
        q: 'Does it work offline?',
        a: 'Some features need a connection — the AI coach and syncing your history among them. If you want to confirm exactly how it behaves without data, write to us and we will tell you.',
      },
      {
        q: 'How do I contact support?',
        a: 'Write to hola@aliciabasurto.com. With the Hormonal Plan you get priority support.',
      },
    ],
  },
];

export function getFaqGroups(locale: Locale): readonly FaqGroup[] {
  if (locale === 'es') return FAQ_GROUPS_ES;

  if (FAQ_TEXT_EN.length !== FAQ_GROUPS_ES.length) {
    throw new Error(
      `faq.ts: ${FAQ_GROUPS_ES.length} Spanish groups but ${FAQ_TEXT_EN.length} English`,
    );
  }

  return FAQ_GROUPS_ES.map((group, i) => {
    const text = FAQ_TEXT_EN[i];
    if (text.items.length !== group.items.length) {
      throw new Error(
        `faq.ts: group "${group.id}" has ${group.items.length} Spanish questions but ${text.items.length} English`,
      );
    }
    return { ...group, title: text.title, items: text.items.map((qa) => ({ ...qa })) };
  });
}

/** @deprecated Spanish-only. Use getFaqGroups(locale). */
export const FAQ_GROUPS = FAQ_GROUPS_ES;
