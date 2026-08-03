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

export const FAQ_GROUPS: readonly FaqGroup[] = [
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
