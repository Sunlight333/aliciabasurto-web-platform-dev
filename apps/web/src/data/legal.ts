/**
 * Legal documents.
 *
 * `terminos` and `privacidad` are **migrated verbatim** from the live Wix
 * site — client-authored text, not rewritten here. `aviso-medico` is
 * §3 of those same Terms, lifted to its own route because a site selling
 * health guidance needs a linkable disclaimer, not a buried clause
 * (site-structure.md §3).
 *
 * ⚠️ `cookies` is the one document with no prior version. It states only
 * what is verifiably true of this site today: no analytics, no tracking,
 * one functional localStorage key. It must be revisited the moment
 * analytics is added (Phase 7) — see the note rendered on the page.
 *
 * Nothing here is legal advice. Any change to these documents belongs
 * with the client's counsel.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string };

export interface LegalSection {
  heading: string;
  blocks: Block[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT: LegalSection = {
  heading: 'Contacto',
  blocks: [
    { type: 'p', text: 'Alicia Basurto LLC' },
    { type: 'p', text: 'Correo electrónico: hola@aliciabasurto.com' },
    { type: 'p', text: 'Sitio web: www.aliciabasurto.com' },
  ],
};

export const TERMINOS: LegalDoc = {
  slug: 'terminos',
  title: 'Términos y Condiciones',
  description:
    'Términos y Condiciones de uso de Nutricycle, la aplicación de nutrición cíclica de Alicia Basurto LLC.',
  updated: '13 de junio de 2026',
  intro:
    'Bienvenida a Nutricycle, una aplicación móvil operada por Alicia Basurto LLC («nosotros», «nuestro» o «nos»). Al descargar, registrarte o usar la App, aceptás estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, por favor no uses la App.',
  sections: [
    {
      heading: 'Descripción del Servicio',
      blocks: [
        {
          type: 'p',
          text: 'Nutricycle es una aplicación de nutrición cíclica que proporciona recomendaciones alimentarias personalizadas basadas en las fases del ciclo menstrual. La App ofrece:',
        },
        {
          type: 'ul',
          items: [
            'Planes de alimentación basados en el ciclo',
            'Recetas con beneficios hormonales',
            'Seguimiento del ciclo menstrual',
            'Contenido educativo sobre salud hormonal',
          ],
        },
      ],
    },
    {
      heading: 'Uso de la App',
      blocks: [
        {
          type: 'p',
          text: 'Elegibilidad. Debés tener al menos 13 años para usar Nutricycle. Al usar la App, confirmás que cumplís con este requisito.',
        },
        { type: 'p', text: 'Cuenta de Usuario:' },
        {
          type: 'ul',
          items: [
            'Sos responsable de mantener la confidencialidad de tu contraseña',
            'Sos responsable de toda la actividad que ocurra en tu cuenta',
            'Debés notificarnos de inmediato si sospechás un uso no autorizado de tu cuenta',
          ],
        },
        {
          type: 'p',
          text: 'Uso Permitido. Aceptás usar la App únicamente para fines personales y no comerciales, y de acuerdo con estos Términos y las leyes aplicables.',
        },
      ],
    },
    {
      heading: 'Aviso Médico Importante',
      blocks: [
        { type: 'callout', text: 'Nutricycle no es un servicio médico.' },
        {
          type: 'p',
          text: 'El contenido de la App es únicamente informativo y educativo. No reemplaza el consejo, diagnóstico ni tratamiento médico profesional. Siempre consultá a tu médico u otro profesional de salud calificado ante cualquier pregunta sobre tu salud o condición médica. Nunca ignores el consejo médico profesional basándote en información de la App.',
        },
      ],
    },
    {
      heading: 'Suscripciones y Pagos',
      blocks: [
        {
          type: 'p',
          text: 'Planes de Suscripción. Nutricycle puede ofrecer acceso mediante suscripción mensual o anual. Los precios se muestran claramente dentro de la App antes de confirmar cualquier compra.',
        },
        {
          type: 'p',
          text: 'Facturación. Los pagos se procesan a través de Apple App Store o Google Play según el dispositivo que uses. Las condiciones de facturación de cada plataforma aplican a tu suscripción.',
        },
        {
          type: 'p',
          text: 'Cancelación. Podés cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta en la tienda de aplicaciones correspondiente. La cancelación se hace efectiva al final del período de facturación actual.',
        },
        {
          type: 'p',
          text: 'Reembolsos. Los reembolsos se rigen por las políticas de Apple App Store o Google Play. No ofrecemos reembolsos directos fuera de esas plataformas.',
        },
      ],
    },
    {
      heading: 'Propiedad Intelectual',
      blocks: [
        {
          type: 'p',
          text: 'Todo el contenido de Nutricycle, incluyendo recetas, textos, imágenes, videos, logotipos y diseño, es propiedad de Alicia Basurto LLC y está protegido por las leyes de derechos de autor. Queda prohibido:',
        },
        {
          type: 'ul',
          items: [
            'Copiar, reproducir o distribuir el contenido de la App sin autorización',
            'Usar el contenido con fines comerciales',
            'Modificar o crear obras derivadas del contenido',
          ],
        },
      ],
    },
    {
      heading: 'Privacidad',
      blocks: [
        {
          type: 'p',
          text: 'El uso de tus datos personales se rige por nuestra Política de Privacidad. Al usar la App, aceptás las prácticas descritas en dicha política.',
        },
      ],
    },
    {
      heading: 'Limitación de Responsabilidad',
      blocks: [
        {
          type: 'p',
          text: 'En la máxima medida permitida por la ley, Alicia Basurto LLC no será responsable por:',
        },
        {
          type: 'ul',
          items: [
            'Daños indirectos, incidentales o consecuentes derivados del uso de la App',
            'Pérdida de datos o interrupción del servicio',
            'Resultados de salud derivados del seguimiento de las recomendaciones de la App',
          ],
        },
      ],
    },
    {
      heading: 'Modificaciones del Servicio',
      blocks: [
        {
          type: 'p',
          text: 'Nos reservamos el derecho de modificar, suspender o discontinuar la App o cualquiera de sus funciones en cualquier momento, con o sin previo aviso.',
        },
      ],
    },
    {
      heading: 'Cambios en los Términos',
      blocks: [
        {
          type: 'p',
          text: 'Podemos actualizar estos Términos y Condiciones ocasionalmente. Te notificaremos sobre cambios importantes a través de la App o por correo electrónico. El uso continuado de la App después de los cambios implica la aceptación de los nuevos términos.',
        },
      ],
    },
    {
      heading: 'Ley Aplicable',
      blocks: [
        {
          type: 'p',
          text: 'Estos Términos se rigen por las leyes del Estado de Illinois, Estados Unidos, sin perjuicio de sus disposiciones sobre conflicto de leyes.',
        },
      ],
    },
    CONTACT,
  ],
};

export const PRIVACIDAD: LegalDoc = {
  slug: 'privacidad',
  title: 'Política de Privacidad',
  description:
    'Cómo Nutricycle recopila, usa y protege tu información personal y tus datos de salud.',
  updated: '13 de junio de 2026',
  intro:
    'Alicia Basurto LLC («nosotros», «nuestro» o «nos») opera la aplicación móvil Nutricycle (la «App»). Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información personal cuando usás la App.',
  sections: [
    {
      heading: 'Información que Recopilamos',
      blocks: [
        { type: 'p', text: 'Información Personal:' },
        {
          type: 'ul',
          items: [
            'Nombre y dirección de correo electrónico (al registrarte)',
            'Contraseña (encriptada)',
          ],
        },
        { type: 'p', text: 'Información de Salud:' },
        {
          type: 'ul',
          items: [
            'Fechas del ciclo menstrual y síntomas',
            'Preferencias nutricionales e información alimentaria',
            'Síntomas físicos y notas de salud que ingresás manualmente',
          ],
        },
        { type: 'p', text: 'Datos de Uso:' },
        {
          type: 'ul',
          items: [
            'Actividad en la App y uso de funciones',
            'Tipo de dispositivo, sistema operativo y versión de la App',
            'Datos de analítica recopilados a través de Firebase y/o Google Analytics',
          ],
        },
        {
          type: 'p',
          text: 'Información de Pago. Datos de suscripción y compras dentro de la App procesados a través de Apple App Store o Google Play. No almacenamos datos de tarjetas de crédito ni información de pago directamente.',
        },
      ],
    },
    {
      heading: 'Cómo Usamos tu Información',
      blocks: [
        { type: 'p', text: 'Usamos la información recopilada para:' },
        {
          type: 'ul',
          items: [
            'Proveer y personalizar la experiencia en Nutricycle',
            'Generar recomendaciones nutricionales basadas en tu ciclo',
            'Procesar tu suscripción o compras dentro de la App',
            'Enviarte notificaciones y actualizaciones relevantes',
            'Mejorar la App a través de analítica',
            'Responder a tus solicitudes de soporte',
            'Cumplir con obligaciones legales',
          ],
        },
      ],
    },
    {
      heading: 'Datos de Salud',
      blocks: [
        {
          type: 'p',
          text: 'Nutricycle recopila información de salud sensible, incluyendo datos del ciclo menstrual y síntomas. Esta información se utiliza exclusivamente para brindarte recomendaciones nutricionales personalizadas dentro de la App. No vendemos, compartimos ni utilizamos tus datos de salud con fines publicitarios.',
        },
      ],
    },
    {
      heading: 'Compartir Información',
      blocks: [
        { type: 'p', text: 'No vendemos tu información personal. Podemos compartir tus datos con:' },
        {
          type: 'ul',
          items: [
            'Proveedores de servicios que nos ayudan a operar la App (por ejemplo, almacenamiento en la nube, analítica)',
            'Autoridades legales si así lo exige la ley',
          ],
        },
        {
          type: 'p',
          text: 'Todos los proveedores externos están obligados contractualmente a proteger tus datos.',
        },
      ],
    },
    {
      heading: 'Retención de Datos',
      blocks: [
        {
          type: 'p',
          text: 'Conservamos tus datos personales mientras tu cuenta esté activa. Podés solicitar la eliminación de tu cuenta y tus datos en cualquier momento escribiéndonos a hola@aliciabasurto.com.',
        },
      ],
    },
    {
      heading: 'Tus Derechos',
      blocks: [
        { type: 'p', text: 'Dependiendo de tu ubicación, podés tener derecho a:' },
        {
          type: 'ul',
          items: [
            'Acceder a los datos personales que tenemos sobre vos',
            'Corregir datos incorrectos',
            'Solicitar la eliminación de tus datos',
            'Retirar tu consentimiento en cualquier momento',
            'Presentar una queja ante una autoridad de protección de datos',
          ],
        },
        {
          type: 'p',
          text: 'Para ejercer cualquiera de estos derechos, contactanos en hola@aliciabasurto.com.',
        },
      ],
    },
    {
      heading: 'Privacidad de Menores',
      blocks: [
        {
          type: 'p',
          text: 'Nutricycle no está destinada a usuarios menores de 13 años. No recopilamos intencionalmente información personal de menores de 13 años. Si creés que hemos recopilado dicha información sin querer, por favor contactanos de inmediato.',
        },
      ],
    },
    {
      heading: 'Seguridad de los Datos',
      blocks: [
        {
          type: 'p',
          text: 'Implementamos medidas de seguridad estándar de la industria para proteger tu información personal, incluyendo encriptación de datos en tránsito y en reposo. Sin embargo, ningún método de transmisión por internet es 100% seguro.',
        },
      ],
    },
    {
      heading: 'Servicios de Terceros',
      blocks: [
        {
          type: 'p',
          text: 'La App puede utilizar los siguientes servicios de terceros que tienen sus propias Políticas de Privacidad:',
        },
        {
          type: 'ul',
          items: [
            'Google Analytics / Firebase — policies.google.com/privacy',
            'Google Play — policies.google.com/privacy',
          ],
        },
      ],
    },
    {
      heading: 'Cambios en esta Política',
      blocks: [
        {
          type: 'p',
          text: 'Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios importantes a través de la App o por correo electrónico. El uso continuado de la App después de los cambios implica la aceptación de la política actualizada.',
        },
      ],
    },
    CONTACT,
  ],
};

export const AVISO_MEDICO: LegalDoc = {
  slug: 'aviso-medico',
  title: 'Aviso Médico',
  description:
    'Nutricycle es contenido informativo y educativo. No reemplaza el consejo, diagnóstico ni tratamiento médico profesional.',
  updated: '13 de junio de 2026',
  intro:
    'Este aviso forma parte de los Términos y Condiciones de Nutricycle y se publica por separado por su importancia.',
  sections: [
    {
      heading: 'Nutricycle no es un servicio médico',
      blocks: [
        { type: 'callout', text: 'Nutricycle no es un servicio médico.' },
        {
          type: 'p',
          text: 'El contenido de la App y de este sitio es únicamente informativo y educativo. No reemplaza el consejo, diagnóstico ni tratamiento médico profesional. Siempre consultá a tu médico u otro profesional de salud calificado ante cualquier pregunta sobre tu salud o condición médica. Nunca ignores el consejo médico profesional basándote en información de la App.',
        },
      ],
    },
    {
      heading: 'Cuándo consultar a un profesional',
      blocks: [
        {
          type: 'p',
          text: 'Te recomendamos hablar con un profesional de salud antes de hacer cambios importantes en tu alimentación, y especialmente si:',
        },
        {
          type: 'ul',
          items: [
            'Estás embarazada, en período de lactancia o buscando un embarazo',
            'Tenés un diagnóstico de SOP, endometriosis, tiroides u otra condición hormonal',
            'Tomás medicación, incluidos anticonceptivos hormonales',
            'Tenés antecedentes de trastornos de la conducta alimentaria',
            'Tus ciclos son muy irregulares, ausentes o dolorosos de forma persistente',
          ],
        },
      ],
    },
    {
      heading: 'Sobre las recomendaciones de la App',
      blocks: [
        {
          type: 'p',
          text: 'Las recomendaciones de Nutricycle se generan a partir de la información que ingresás y de principios generales de nutrición cíclica. No constituyen un plan clínico individualizado ni tienen en cuenta tu historia médica completa.',
        },
        {
          type: 'p',
          text: 'Las respuestas de la asesora con inteligencia artificial son orientativas y pueden contener errores. No deben usarse como base para decisiones médicas.',
        },
      ],
    },
    {
      heading: 'Limitación de responsabilidad',
      blocks: [
        {
          type: 'p',
          text: 'En la máxima medida permitida por la ley, Alicia Basurto LLC no será responsable por resultados de salud derivados del seguimiento de las recomendaciones de la App.',
        },
      ],
    },
    CONTACT,
  ],
};

export const COOKIES: LegalDoc = {
  slug: 'cookies',
  title: 'Política de Cookies',
  description:
    'Qué almacena este sitio en tu navegador. Actualmente no usamos cookies de análisis ni de publicidad.',
  updated: '3 de agosto de 2026',
  intro:
    'Esta política describe qué información almacena aliciabasurto.com en tu navegador. Se refiere únicamente a este sitio web; el tratamiento de datos dentro de la aplicación móvil se describe en la Política de Privacidad.',
  sections: [
    {
      heading: 'Qué usamos hoy',
      blocks: [
        {
          type: 'callout',
          text: 'Este sitio no utiliza cookies de análisis, de publicidad ni de seguimiento.',
        },
        {
          type: 'p',
          text: 'El sitio guarda un único dato funcional en el almacenamiento local de tu navegador:',
        },
        {
          type: 'ul',
          items: [
            'nc.appbar.dismissed — recuerda que cerraste la barra de descarga para no volver a mostrártela. No identifica a ninguna persona y no se envía a ningún servidor.',
          ],
        },
        {
          type: 'p',
          text: 'Podés borrarlo en cualquier momento desde los ajustes de tu navegador, sin afectar el funcionamiento del sitio.',
        },
      ],
    },
    {
      heading: 'Servicios de terceros',
      blocks: [
        {
          type: 'p',
          text: 'Los botones de descarga te llevan a App Store y Google Play. Esas plataformas aplican sus propias políticas de privacidad y cookies una vez que salís de este sitio.',
        },
      ],
    },
    {
      heading: 'Si esto cambia',
      blocks: [
        {
          type: 'p',
          text: 'Si en el futuro incorporamos herramientas de analítica, actualizaremos esta política y solicitaremos tu consentimiento antes de activarlas.',
        },
      ],
    },
    CONTACT,
  ],
};

export const LEGAL_DOCS = [TERMINOS, PRIVACIDAD, AVISO_MEDICO, COOKIES] as const;
