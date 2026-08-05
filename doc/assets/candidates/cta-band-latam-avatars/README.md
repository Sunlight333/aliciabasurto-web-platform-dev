# Avatares — 11 personas recortadas de `cta-band-latam`

Abre `index.html` para verlos en redondo a 28 / 40 / 64 / 120 px, que es como se usan de verdad.

## Una por persona

Las 20 fotos del lote no son 20 personas: varias vienen de la misma sesión. Agrupadas:

| Persona | Avatar | Fotos de origen |
| --- | --- | --- |
| Camisa rosa | `01-camisa-rosa` | 01, 02, 03, 04 |
| Cocina de mármol | `02-cocina-marmol` | 05, 06, 07 |
| Jersey gris | `03-jersey-gris` | 08, 09, 10 |
| Sofá crema | `04-sofa-crema` | 11 |
| Jersey verde | `05-jersey-verde` | 12, 13 |
| Retrato cálido | `06-retrato-calido` | 14 |
| Camisa azul | `07-camisa-azul` | 16 |
| Cocina con tulipanes | `08-cocina-tulipanes` | 17 |
| Encimera con verduras | `09-encimera-verduras` | 18 |
| Sofá con plantas | `10-sofa-plantas` | 19 |
| México, exterior | `11-mexico-exterior` | 20 |

**La foto 15 no da avatar**: está tomada desde detrás del hombro y no hay cara utilizable. De ahí
que salgan 11 y no 12.

## Formatos

| Carpeta | Qué es |
| --- | --- |
| `1024/` | JPG 1024×1024 |
| `512/` | JPG 512×512 — el que usarás casi siempre |
| `webp/` | WebP 512×512 |
| `round/` | PNG 512×512 con máscara circular y fondo transparente |
| `manifest.json` | Origen, tamaño del recorte en el master y si hubo reescalado |

## Calidad del recorte

Cada recorte sale del master de 2400 px centrado en la cara, con la mirada a la altura de un
retrato. Dos avisos:

- **`08-cocina-tulipanes`**: en el original la persona está lejos, dentro de una cocina amplia. El
  recorte real es de 460 px y se reescala a 512, así que es el más blando del lote.
- **`10-sofa-plantas`**: el enfoque del original está en el móvil en primer plano, no en la cara.
  Nítida no va a quedar por más que se recorte.

Los otros nueve salen de recortes de 520 a 1700 px, o sea sin inventar resolución.

## Antes de publicarlos

La licencia de Pexels permite uso comercial, pero **no** presentar a una persona identificable como
si respaldara un producto. Un avatar junto a un testimonio ("María, 34 años: bajé 6 kilos") es
justo ese caso, y además sería un testimonio falso. Como foto genérica de interfaz (avatar por
defecto, ejemplo de perfil, maqueta) no hay problema.
