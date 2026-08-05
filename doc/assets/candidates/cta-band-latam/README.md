# CtaBand — 20 candidatas (persona + móvil, pantalla oculta)

Abre `index.html` en el navegador: cada foto se renderiza como la banda de cierre real, con la
tarjeta encima y tres layouts para comparar.

## Reglas que cumplen las 20

- **Persona con móvil**, escena de casa, no gradiente ni fondo plano.
- **Pantalla nunca visible.** Verificado una a una a resolución completa. Dos formas de resolverlo:
  teléfono al oído (15 fotos) o dorso del móvil hacia cámara mientras lo miran (11, 17, 18, 19, 20).
- **Ambiente compatible con el proyecto**: cocina o sala luminosa, luz natural, cremas/verdes,
  y hueco libre donde cae la tarjeta.

## Sobre el origen de las personas

La nacionalidad no es verificable en una fotografía, así que no la afirmo. Cada ficha lleva
etiquetado de dónde sale la señal:

| Etiqueta | Qué significa | Fichas |
| --- | --- | --- |
| `México (metadatos)` | Localización real en los metadatos de Pexels | 20 (Lerma de Villada, Edo. de México) |
| `latina/hispanic` | Pexels devuelve la foto para búsquedas *latina* / *hispanic* / *mexican woman* | 01–07, 11–14, 16 |
| `sin etiqueta` | Sin señal de origen; entran solo por escena y palette | 08, 09, 10, 15, 17, 18, 19 |

Las siete `sin etiqueta` son justo las de mejor ambiente (cocina con comida, tulipanes, encimera
con verduras). Dime si prefieres que las cambie por fotos etiquetadas aunque el entorno baje un
punto, y hago la sustitución.

## Formatos

| Carpeta | Qué es |
| --- | --- |
| `jpg/` | Master 2400 px de ancho |
| `webp/` | 1600 px, calidad 80 |
| `avif/` | 1600 px, calidad 50 — el más ligero |
| `preview-crop/` | Recorte 1400×600 (21:9) para ver el encuadre de banda |
| `manifest.json` | Nombre, ID de Pexels, dimensiones y peso por formato |

Total del lote: 13,7 MB. Todo Pexels, licencia de uso comercial libre y sin atribución obligatoria
(la atribución sigue siendo buena práctica).

## Cuando elijas una

Dime el número y la dejo montada en `CtaBand`: recorte a la banda, versión `webp` + `avif` con
`<picture>`, velo crema por encima para que el texto mantenga contraste, y `priority={false}`
porque está al final de la página.

## Dos cosas a tener en cuenta

**Una cara implica respaldo.** La licencia permite uso comercial pero no presentar a una persona
identificable como si avalara el producto — que es lo que puede parecer una cara de stock junto a
una promesa de salud. La ficha 15 (nuca y mano, sin cara reconocible) es la más segura en ese
sentido.

**Teléfono al oído ≠ usar la app.** Ocultar la pantalla con una llamada es cómodo, pero una llamada
no cuenta "consulto mi fase". Las que sostienen el móvil mirándolo con el dorso hacia cámara (11,
17, 18, 19, 20) cumplen la misma regla y cuentan mejor la historia.
