    const allKeyIds = [
      'key-shift', 'key-alpha', 'key-optn', 'key-comma',
      'key-menu', 'key-on', 'key-x2', 'key-mplus',
      'key-dpad', 'key-ok', 'key-del', 'key-ac', 'key-eq',
      'key-0', 'key-1', 'key-2', 'key-3', 'key-4', 'key-5', 'key-6', 'key-7', 'key-8', 'key-9'
    ];

    let currentDataset = 'ej12';
    let currentModel = 'classwiz';
    let currentStep = 1;
    let currentGoal = 'regression';

    const goals = {
      regression: {
        label: 'Obtené la recta de regresión: a y b',
        copy: 'Intentalo primero con tu calculadora. Cuando quieras, pedí una pista.',
        hint: 'Primero entrá a Estadística, elegí el modelo lineal y cargá todos los pares (x, y).',
        steps: [1, 2, 3, 4],
        result: ds => `Compará con la guía: a = <strong>${ds.a}</strong> y b = <strong>${ds.b}</strong>. La recta es ŷ = ${ds.a === '0' ? '' : `${ds.a} + `}${ds.b}x.`
      },
      r: {
        label: 'Obtené el coeficiente de correlación r',
        copy: 'Buscá el resultado de Pearson después de cargar los datos.',
        hint: 'La ruta para r es la misma que para la regresión lineal: primero configurá la tabla y después buscá el resultado de regresión.',
        steps: [1, 2, 3, 4],
        result: ds => `El valor esperado es <strong>r = ${ds.rShort}</strong> (la calculadora puede mostrar más decimales).`
      },
      r2: {
        label: 'Calculá el coeficiente de determinación R²',
        copy: 'Primero obtené r; después elevá ese valor al cuadrado.',
        hint: 'R² no suele aparecer junto con a, b y r. Conservá r en pantalla o anotado para elevarlo al cuadrado.',
        steps: [1, 2, 3, 4, 5],
        result: ds => `Con r = ${ds.rShort}, el resultado esperado es <strong>R² = ${ds.r2}</strong>.`
      },
      sums: {
        label: 'Verificá las sumatorias intermedias',
        copy: 'Cargá los pares y consultá las sumas que usa la calculadora internamente.',
        hint: 'Necesitás entrar al modo de dos variables o a la opción Sum, según la familia de tu Casio.',
        steps: [1, 2, 3, 'sums'],
        result: ds => `Compará Σx = <strong>${ds.sx}</strong>, Σy = <strong>${ds.sy}</strong> y Σxy = <strong>${ds.sxy}</strong>.`
      },
      prediction: {
        label: 'Prepará una predicción con la recta',
        copy: 'Obtené a y b; luego usá el simulador para reemplazar el valor de x.',
        hint: 'La predicción sale de ŷ = a + b·x. Primero necesitás obtener la recta en tu calculadora.',
        steps: [1, 2, 3, 4],
        result: ds => `Con la recta obtenida, seguí en el simulador de predicciones. Para estos datos: <strong>ŷ = ${ds.a === '0' ? '' : `${ds.a} + `}${ds.b}x</strong>.`
      }
    };

    function getModelsData(ds) {
      const tableRowsHtml = ds.rows.map((r, i) => `
        <tr class="${i === ds.rows.length - 1 ? 'bg-[#141e12] text-[#d3dec8] font-bold' : ''}">
          <td>${r.idx}</td>
          <td class="text-center border-l border-[#7a8c6e]">${r.x}</td>
          <td class="text-center border-l border-[#7a8c6e]">${r.y}</td>
        </tr>
      `).join('');

      return {
        classwiz: {
          title: "1 · Procedimiento en Casio ClassWiz (fx-570LA X / fx-991EX / fx-82LA X)",
          headerDesc: "La familia ClassWiz (fx-570LA X / fx-991EX) usa menús con íconos en pantalla y la tecla OPTN. Guiate por los nombres en pantalla además del número de opción.",
          chassisClass: "calc-chassis-classwiz",
          modelLabel: "fx-570LA X / fx-991EX",
          seriesBadge: "CLASSWIZ",
          subBadge: "Natural-V.P.A.M.",
          menuKeyText: "MENU",
          menuTopLabel: "SETUP",
          optnKeyText: "OPTN",
          mplusKeyText: "x■",
          okText: "",
          acBlue: true,
          showStatSublabels: false,
          steps: {
            1: {
              title: "Entrar a Estadística",
              pills: ["MENU", "6", "="],
              desc: "Apretá <code>MENU</code>, buscá el ícono de <strong>Estadística</strong> (<em>Statistics</em>, opción 6) y confirmá con <code>=</code>.",
              miniTop: "MENU [6]",
              miniBody: "6:Estadística",
              badge: "PASO 1/5",
              status: "MENU PRINCIPAL",
              footer: "Apretá [MENU] y luego [6] o [=]",
              banner: "Paso 1: Apretá MENU y elegí 6: Estadística",
              keys: ['key-menu', 'key-6', 'key-eq'],
              html: `
                <div class="font-bold mb-1 flex items-center justify-between">
                  <span>6: Estadística</span><span class="text-xs">[6]</span>
                </div>
                <div class="grid grid-cols-3 gap-1 text-center text-xs">
                  <div class="border border-[#7a8c6e] rounded p-1 opacity-60">1:Calc</div>
                  <div class="border border-[#7a8c6e] rounded p-1 opacity-60">2:Cmplx</div>
                  <div class="border border-[#7a8c6e] rounded p-1 opacity-60">3:Base</div>
                  <div class="border border-[#7a8c6e] rounded p-1 opacity-60">4:Matr</div>
                  <div class="border border-[#7a8c6e] rounded p-1 opacity-60">5:Vect</div>
                  <div class="bg-[#141e12] text-[#d3dec8] font-bold rounded p-1">6:Estad</div>
                </div>
              `
            },
            2: {
              title: "Elegir regresión lineal (dos variables)",
              pills: ["2 (y=a+bx)"],
              desc: "Cuando pregunta el tipo de datos, elegí <strong>y=a+bx</strong> (o <strong>A+BX</strong>, opción 2).",
              miniTop: "Tipo de datos",
              miniBody: "2: y=a+bx (A+BX)",
              badge: "PASO 2/5",
              status: "ESTADÍSTICA",
              footer: "Apretá [2] para y=a+bx (A+BX)",
              banner: "Paso 2: Elegí la opción 2 (y=a+bx / A+BX)",
              keys: ['key-2'],
              html: `
                <div class="text-xs opacity-80 mb-1">Seleccioná tipo de datos:</div>
                <div class="space-y-0.5 text-xs">
                  <div class="px-1.5 py-0.5 opacity-70">1: 1-Variable</div>
                  <div class="px-1.5 py-1 bg-[#141e12] text-[#d3dec8] font-bold rounded">2: y=a+bx  (A+BX)</div>
                  <div class="px-1.5 py-0.5 opacity-70">3: y=a+bx+cx²</div>
                  <div class="px-1.5 py-0.5 opacity-70">4: y=a+b·ln(x)</div>
                </div>
              `
            },
            3: {
              title: "Cargar la tabla x e y",
              pills: ["Valor", "="],
              desc: "Aparece una tabla con columnas <code>x</code> e <code>y</code>. Cargá cada valor y fijalo con <code>=</code>.",
              miniTop: `Tabla (${ds.name})`,
              miniBody: `1: ${ds.rows[0].x} | ${ds.rows[0].y}`,
              badge: "PASO 3/5",
              status: `TABLA (n=${ds.n})`,
              footer: "Cargá cada número y fijalo con [=]",
              banner: "Paso 3: Escribí cada valor de (x, y) y apretá =",
              keys: ['key-2', 'key-4', 'key-5', 'key-6', 'key-7', 'key-eq', 'key-dpad'],
              html: `
                <table class="w-full text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-[#7a8c6e]">
                      <th class="text-left py-0.5 w-6">#</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">x</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">y</th>
                    </tr>
                  </thead>
                  <tbody>${tableRowsHtml}</tbody>
                </table>
              `
            },
            4: {
              title: "Cálculo de regresión (a, b y r juntos)",
              pills: ["AC", "OPTN", "4"],
              desc: "Apretá <code>AC</code>, después <code>OPTN</code> y elegí <strong>4: Cálculo de regresión</strong> (<em>Regression Calc</em>). Muestra <strong>a</strong> (ordenada), <strong>b</strong> (pendiente) y <strong>r</strong> juntos en pantalla.",
              miniTop: "OPTN → [4]",
              miniBody: `a=${ds.a} b=${ds.b} r=${ds.rShort}`,
              badge: "PASO 4/5",
              status: "AC → OPTN → [4]",
              footer: "Ordenada (a), Pendiente (b) y Pearson (r)",
              banner: "Paso 4: Apretá AC, luego OPTN y 4 (Cálculo de regresión)",
              keys: ['key-ac', 'key-optn', 'key-4'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  4: Cálculo de regresión (y=a+bx)
                </div>
                <div class="space-y-0.5 text-xs font-bold">
                  <div class="flex justify-between"><span>a (A, ordenada)</span><span>= ${ds.a}</span></div>
                  <div class="flex justify-between"><span>b (B, pendiente)</span><span>= ${ds.b}</span></div>
                  <div class="flex justify-between bg-[#141e12] text-[#d3dec8] px-1 rounded"><span>r (Pearson)</span><span>= ${ds.r}</span></div>
                </div>
              `
            },
            5: {
              title: "Calcular R² aparte",
              pills: ["x²", "="],
              desc: "<strong>R²</strong> es <code>r²</code>. Escribí el valor de <code>r</code> y elevalo al cuadrado apretando <code>x²</code> y <code>=</code>.",
              miniTop: "Determinación R²",
              miniBody: `(${ds.rShort})² = ${ds.r2}`,
              badge: "PASO 5/5",
              status: "CALCULAR R²",
              footer: "Elevá r al cuadrado con [x²] y [=]",
              banner: "Paso 5: Elevá r al cuadrado apretando x² y =",
              keys: ['key-x2', 'key-eq'],
              html: `
                <div class="space-y-1.5">
                  <div class="text-xs opacity-80">Determinación R² = r²:</div>
                  <div class="text-sm font-bold">(${ds.rShort})²</div>
                  <div class="text-right text-base font-bold bg-[#141e12] text-[#d3dec8] px-2 py-0.5 rounded">
                    R² = ${ds.r2}
                  </div>
                </div>
              `
            },
            sums: {
              title: "Ver sumas intermedias (Σx, Σy, Σxy, Σx², Σy²)",
              pills: ["OPTN", "3"],
              desc: "Apretá <code>AC</code>, luego <code>OPTN</code> y elegí <strong>3: Cálculo de 2 variables</strong> (<em>2-Variable Calc</em>). Usá las flechas <code>▼</code> para recorrer todas las sumas.",
              miniTop: "OPTN → [3]",
              miniBody: `Σx=${ds.sx} Σy=${ds.sy}`,
              badge: "SUMATORIAS",
              status: "OPTN → [3] 2-Var",
              footer: "3: Cálculo de 2 variables",
              banner: "Sumatorias: Apretá OPTN y 3 (Cálculo de 2 variables)",
              keys: ['key-optn', 'key-3'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  3: Cálc. 2 variables (${ds.name})
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs font-bold">
                  <div class="flex justify-between"><span>Σx</span><span>=${ds.sx}</span></div>
                  <div class="flex justify-between"><span>Σy</span><span>=${ds.sy}</span></div>
                  <div class="flex justify-between"><span>Σx²</span><span>=${ds.sx2}</span></div>
                  <div class="flex justify-between"><span>Σy²</span><span>=${ds.sy2}</span></div>
                  <div class="flex justify-between col-span-2 bg-[#141e12] text-[#d3dec8] px-1 rounded"><span>Σxy = ${ds.sxy}</span><span>n = ${ds.n}</span></div>
                </div>
              `
            }
          }
        },

        esplus: {
          title: "1 · Procedimiento en Casio ES / ES PLUS (fx-82ES / fx-95ES / fx-570ES Plus)",
          headerDesc: "La familia ES / ES PLUS tiene tabla para cargar datos, pero no tiene tecla OPTN: los resultados se buscan apretando SHIFT + 1 (STAT).",
          chassisClass: "calc-chassis-esplus",
          modelLabel: "fx-82ES / fx-570ES PLUS",
          seriesBadge: "ES PLUS",
          subBadge: "Natural-V.P.A.M.",
          menuKeyText: "MODE",
          menuTopLabel: "SETUP",
          optnKeyText: "CALC",
          mplusKeyText: "M+",
          okText: "",
          acBlue: false,
          showStatSublabels: true,
          steps: {
            1: {
              title: "Entrar al modo STAT",
              pills: ["MODE", "2 o 3 (STAT)"],
              desc: "Apretá <code>MODE</code> y elegí <strong>STAT</strong> (en la fx-82ES/95ES suele ser el <code>2</code>; en la fx-570ES/991ES es el <code>3</code>).",
              miniTop: "MODE",
              miniBody: "1:COMP  2/3:STAT",
              badge: "PASO 1/5",
              status: "MODE",
              footer: "Elegí STAT ([2] o [3])",
              banner: "Paso 1: Apretá MODE y el número de STAT (2 o 3)",
              keys: ['key-menu', 'key-2', 'key-3'],
              html: `
                <div class="font-bold mb-1">Seleccionar modo (MODE):</div>
                <div class="space-y-1 text-xs">
                  <div>1: COMP</div>
                  <div class="bg-[#141e12] text-[#d3dec8] font-bold px-1.5 py-0.5 rounded">2 (o 3): STAT</div>
                  <div>3 (o 7): TABLE</div>
                </div>
              `
            },
            2: {
              title: "Elegir A+BX (regresión lineal)",
              pills: ["2 (A+BX)"],
              desc: "Aparece la lista de modelos estadísticos: apretá <code>2</code> para elegir <strong>A+BX</strong>.",
              miniTop: "STAT",
              miniBody: "2: A+BX",
              badge: "PASO 2/5",
              status: "STAT",
              footer: "Apretá [2] para A+BX",
              banner: "Paso 2: Apretá 2 para elegir el modelo lineal A+BX",
              keys: ['key-2'],
              html: `
                <div class="space-y-0.5 text-xs">
                  <div class="opacity-75">1: 1-VAR</div>
                  <div class="bg-[#141e12] text-[#d3dec8] font-bold px-1.5 py-0.5 rounded">2: A+BX</div>
                  <div class="opacity-75">3: _+CX²</div>
                  <div class="opacity-75">4: ln X</div>
                </div>
              `
            },
            3: {
              title: "Cargar la tabla X e Y",
              pills: ["Valor", "="],
              desc: "Aparece la tabla con columnas <code>X</code> e <code>Y</code>. Ingresá cada número y confirmalo con <code>=</code>.",
              miniTop: `Tabla (${ds.name})`,
              miniBody: `1: ${ds.rows[0].x} | ${ds.rows[0].y}`,
              badge: "PASO 3/5",
              status: `STAT | TABLA (n=${ds.n})`,
              footer: "Ingresá cada dato y apretá [=]",
              banner: "Paso 3: Cargá los pares (X, Y) confirmando cada uno con =",
              keys: ['key-2', 'key-4', 'key-5', 'key-6', 'key-7', 'key-eq', 'key-dpad'],
              html: `
                <table class="w-full text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-[#7a8c6e]">
                      <th class="text-left py-0.5 w-6">#</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">X</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">Y</th>
                    </tr>
                  </thead>
                  <tbody>${tableRowsHtml}</tbody>
                </table>
              `
            },
            4: {
              title: "Sacar A, B y r uno por uno con SHIFT + 1",
              pills: ["AC", "SHIFT", "1 (STAT)", "5 (Reg)", "="],
              desc: "Apretá <code>AC</code>, luego <code>SHIFT</code> + <code>1</code> (STAT) y elegí <strong>5: Reg</strong>. Ahí elegís <code>1:A</code>, <code>2:B</code> o <code>3:r</code> y apretás <code>=</code>.",
              miniTop: "SHIFT + 1 → 5:Reg",
              miniBody: `A=${ds.a} B=${ds.b} r=${ds.rShort}`,
              badge: "PASO 4/5",
              status: "SHIFT + 1 (STAT)",
              footer: "Elegí 1:A, 2:B o 3:r y apretá [=]",
              banner: "Paso 4: AC → SHIFT + 1 → 5:Reg → elegí A, B o r y apretá =",
              keys: ['key-ac', 'key-shift', 'key-1', 'key-5', 'key-eq'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  SHIFT + 1 (STAT) → 5:Reg
                </div>
                <div class="grid grid-cols-3 gap-1 text-xs mb-1">
                  <div class="border border-[#7a8c6e] rounded px-1">1:A (${ds.a})</div>
                  <div class="border border-[#7a8c6e] rounded px-1">2:B (${ds.b})</div>
                  <div class="bg-[#141e12] text-[#d3dec8] font-bold rounded px-1">3:r</div>
                </div>
                <div class="flex justify-between font-bold text-xs pt-1 border-t border-[#7a8c6e]">
                  <span>r =</span><span>${ds.r}</span>
                </div>
              `
            },
            5: {
              title: "Calcular R² con r²",
              pills: ["x²", "="],
              desc: "Con el valor de <code>r</code> en pantalla, apretá <code>x²</code> y <code>=</code>.",
              miniTop: "r²",
              miniBody: `r² = ${ds.r2}`,
              badge: "PASO 5/5",
              status: "CALCULAR R²",
              footer: "Con r en pantalla apretá [x²] [=]",
              banner: "Paso 5: Apretá x² y = para elevar r al cuadrado",
              keys: ['key-x2', 'key-eq'],
              html: `
                <div class="space-y-1.5">
                  <div class="text-xs opacity-80">En pantalla:</div>
                  <div class="text-sm font-bold">r²</div>
                  <div class="text-right text-base font-bold bg-[#141e12] text-[#d3dec8] px-2 py-0.5 rounded">
                    ${ds.r2}
                  </div>
                </div>
              `
            },
            sums: {
              title: "Ver sumas (Σx, Σy, Σxy, Σx²) en SHIFT + 1 → 3:Sum",
              pills: ["SHIFT", "1 (STAT)", "3 (Sum)"],
              desc: "Apretá <code>AC</code>, luego <code>SHIFT</code> + <code>1</code> (STAT) y elegí <strong>3: Sum</strong>. Elegí cada sumatoria y apretá <code>=</code>.",
              miniTop: "SHIFT + 1 → 3:Sum",
              miniBody: `Σx=${ds.sx} Σxy=${ds.sxy}`,
              badge: "SUMATORIAS",
              status: "SHIFT+1 → 3:Sum",
              footer: "Elegí la suma y apretá [=]",
              banner: "Sumatorias: SHIFT + 1 (STAT) → 3 (Sum) y elegí la sumatoria",
              keys: ['key-shift', 'key-1', 'key-3', 'key-eq'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  SHIFT + 1 → 3:Sum (${ds.name})
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs font-bold">
                  <div>1:Σx² = ${ds.sx2}</div>
                  <div>2:Σx = ${ds.sx}</div>
                  <div>3:Σy² = ${ds.sy2}</div>
                  <div>4:Σy = ${ds.sy}</div>
                  <div class="col-span-2 bg-[#141e12] text-[#d3dec8] px-1 rounded">5:Σxy = ${ds.sxy}</div>
                </div>
              `
            }
          }
        },

        ms: {
          title: "1 · Procedimiento en Casio MS de 2 líneas (fx-82MS / fx-95MS / fx-570MS)",
          headerDesc: "La línea MS no muestra tabla en pantalla: los pares (x, y) se cargan separados por la tecla coma (,) y apretando M+ (DT) después de cada par.",
          chassisClass: "calc-chassis-ms",
          modelLabel: "fx-82MS / fx-95MS / fx-570MS",
          seriesBadge: "S-V.P.A.M.",
          subBadge: "2-Line Display",
          menuKeyText: "MODE",
          menuTopLabel: "CLR",
          optnKeyText: "RCL",
          mplusKeyText: "M+ (DT)",
          okText: "",
          acBlue: false,
          showStatSublabels: true,
          steps: {
            1: {
              title: "Entrar al modo REG (Regresión)",
              pills: ["MODE", "REG"],
              desc: "Apretá <code>MODE</code> (una o dos veces según el modelo) y elegí el número que corresponda a <strong>REG</strong> en pantalla.",
              miniTop: "MODE",
              miniBody: "COMP  SD  REG",
              badge: "PASO 1/5",
              status: "MODE → REG",
              footer: "Apretá [MODE] y elegí REG",
              banner: "Paso 1: Apretá MODE y el número que indique REG en pantalla",
              keys: ['key-menu', 'key-2', 'key-3'],
              html: `
                <div class="space-y-2 text-xs font-bold">
                  <div class="flex justify-between"><span>COMP</span><span>SD</span><span>REG</span></div>
                  <div class="flex justify-between border-t border-[#7a8c6e] pt-1">
                    <span>1</span><span>2</span><span class="bg-[#141e12] text-[#d3dec8] px-2 rounded">REG</span>
                  </div>
                </div>
              `
            },
            2: {
              title: "Elegir 1: Lin (Regresión Lineal)",
              pills: ["1 (Lin)"],
              desc: "Cuando aparece el menú de tipos de regresión en pantalla, apretá <code>1</code> para elegir <strong>Lin</strong> (lineal).",
              miniTop: "REG",
              miniBody: "1:Lin  2:Log  3:Exp",
              badge: "PASO 2/5",
              status: "REG → Lin",
              footer: "Apretá [1] para Lin",
              banner: "Paso 2: Apretá 1 para elegir regresión lineal (Lin)",
              keys: ['key-1'],
              html: `
                <div class="space-y-2 text-xs font-bold">
                  <div class="flex justify-between"><span>Lin</span><span>Log</span><span>Exp</span></div>
                  <div class="flex justify-between border-t border-[#7a8c6e] pt-1">
                    <span class="bg-[#141e12] text-[#d3dec8] px-2 rounded">1</span><span>2</span><span>3</span>
                  </div>
                </div>
              `
            },
            3: {
              title: "Cargar cada par con la coma (,) y M+ (DT)",
              pills: ["x", ",", "y", "M+"],
              desc: "<strong>Sin tabla:</strong> para cada par escribí <code>x</code>, apretá la coma <code>,</code>, escribí <code>y</code> y apretá <code>M+</code> (DT).",
              miniTop: `${ds.rows[ds.rows.length - 1].x} , ${ds.rows[ds.rows.length - 1].y} [M+]`,
              miniBody: `n= ${ds.n}.`,
              badge: "PASO 3/5",
              status: "CARGA CON [,] Y [M+]",
              footer: "x [,] y [M+] por cada par",
              banner: "Paso 3: Escribí x , y y apretá M+ (DT) para cada par",
              keys: ['key-2', 'key-comma', 'key-7', 'key-mplus'],
              html: `
                <div class="space-y-1 text-xs font-bold">
                  <div>Secuencia (${ds.name}):</div>
                  <div class="font-mono text-xs">${ds.msSeq1}</div>
                  <div class="font-mono text-xs">${ds.msSeq2}</div>
                  <div class="text-right bg-[#141e12] text-[#d3dec8] px-2 py-0.5 rounded mt-1">
                    n= ${ds.n}.
                  </div>
                </div>
              `
            },
            4: {
              title: "Sacar A, B y r con SHIFT + 2 (S-VAR) y flecha ▶",
              pills: ["SHIFT", "2 (S-VAR)", "▶", "▶", "="],
              desc: "Apretá <code>SHIFT</code> + <code>2</code> (S-VAR) y tocá la flecha derecha <code>▶</code> dos veces hasta ver <strong>A, B y r</strong>. Elegí <code>1 (A)</code>, <code>2 (B)</code> o <code>3 (r)</code> y apretá <code>=</code>.",
              miniTop: "SHIFT + 2 → ▶ ▶",
              miniBody: `A=${ds.a} B=${ds.b} r=${ds.rShort}`,
              badge: "PASO 4/5",
              status: "SHIFT+2 (S-VAR) ▶▶",
              footer: "Elegí 1:A, 2:B o 3:r y apretá [=]",
              banner: "Paso 4: SHIFT + 2 → flecha derecha ▶ dos veces → 1, 2 o 3 y =",
              keys: ['key-shift', 'key-2', 'key-dpad', 'key-eq'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  SHIFT + 2 (S-VAR) → ▶ ▶
                </div>
                <div class="flex justify-around text-xs font-bold py-1">
                  <span>1:A (${ds.a})</span>
                  <span>2:B (${ds.b})</span>
                  <span class="bg-[#141e12] text-[#d3dec8] px-1.5 rounded">3:r</span>
                </div>
                <div class="text-right font-bold text-xs border-t border-[#7a8c6e] pt-1">
                  r = ${ds.r}
                </div>
              `
            },
            5: {
              title: "Calcular R² con x²",
              pills: ["x²", "="],
              desc: "Con el valor de <code>r</code> en pantalla, apretá <code>x²</code> y luego <code>=</code>.",
              miniTop: "r²",
              miniBody: `${ds.r2}`,
              badge: "PASO 5/5",
              status: "CALCULAR R²",
              footer: "Apretá [x²] y [=]",
              banner: "Paso 5: Con r en pantalla apretá x² y =",
              keys: ['key-x2', 'key-eq'],
              html: `
                <div class="space-y-1.5">
                  <div class="text-xs opacity-80">Elevando r al cuadrado:</div>
                  <div class="text-sm font-bold">r²</div>
                  <div class="text-right text-base font-bold bg-[#141e12] text-[#d3dec8] px-2 py-0.5 rounded">
                    ${ds.r2}
                  </div>
                </div>
              `
            },
            sums: {
              title: "Ver sumas (Σx, Σy, Σxy, Σx²) en SHIFT + 1 (S-SUM)",
              pills: ["SHIFT", "1 (S-SUM)", "▶", "="],
              desc: "Apretá <code>SHIFT</code> + <code>1</code> (S-SUM). En la primera pantalla están <code>1:Σx²</code>, <code>2:Σx</code>, <code>3:n</code>; moviendo con <code>▶</code> aparecen <code>1:Σy²</code>, <code>2:Σy</code>, <code>3:Σxy</code>.",
              miniTop: "SHIFT + 1 (S-SUM)",
              miniBody: `Σx=${ds.sx} Σxy=${ds.sxy}`,
              badge: "SUMATORIAS",
              status: "SHIFT + 1 (S-SUM)",
              footer: "Usá ▶ para ver Σy y Σxy",
              banner: "Sumatorias: SHIFT + 1 (S-SUM) y movete con ▶ para ver todas las sumas",
              keys: ['key-shift', 'key-1', 'key-dpad', 'key-eq'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  SHIFT + 1 (S-SUM) y flecha ▶
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs font-bold">
                  <div>1:Σx² = ${ds.sx2}</div>
                  <div>2:Σx = ${ds.sx}</div>
                  <div>▶ 1:Σy² = ${ds.sy2}</div>
                  <div>▶ 2:Σy = ${ds.sy}</div>
                  <div class="col-span-2 bg-[#141e12] text-[#d3dec8] px-1 rounded">▶ 3:Σxy = ${ds.sxy}</div>
                </div>
              `
            }
          }
        },

        cw: {
          title: "1 · Procedimiento en Casio ClassWiz CW (fx-991LA CW / fx-570LA CW / fx-82LA CW)",
          headerDesc: "La generación ClassWiz CW reemplaza MENU por HOME y utiliza el botón central OK del cursor circular para abrir los resultados desde la tabla.",
          chassisClass: "calc-chassis-cw",
          modelLabel: "fx-991LA CW / fx-82LA CW",
          seriesBadge: "CLASSWIZ CW",
          subBadge: "High-Res Menu UI",
          menuKeyText: "HOME",
          menuTopLabel: "HOME",
          optnKeyText: "CATALOG",
          mplusKeyText: "FORMAT",
          okText: "OK",
          acBlue: false,
          showStatSublabels: false,
          steps: {
            1: {
              title: "Apretar HOME y entrar a Estadística",
              pills: ["HOME", "Flechas", "OK"],
              desc: "Apretá <code>HOME</code>, movete con las flechas hasta el ícono <strong>Estadística</strong> y presioná el botón central <code>OK</code>.",
              miniTop: "HOME",
              miniBody: "[Estadística] → OK",
              badge: "PASO 1/5",
              status: "HOME → ESTADÍSTICA",
              footer: "Seleccioná Estadística con [OK]",
              banner: "Paso 1: Apretá HOME, buscá Estadística y presioná OK",
              keys: ['key-menu', 'key-dpad', 'key-ok'],
              html: `
                <div class="font-bold mb-1">HOME · Aplicaciones</div>
                <div class="grid grid-cols-2 gap-1.5 text-xs">
                  <div class="border border-[#7a8c6e] rounded p-1.5 opacity-65">Calcular</div>
                  <div class="bg-[#141e12] text-[#d3dec8] font-bold rounded p-1.5">Estadística [OK]</div>
                  <div class="border border-[#7a8c6e] rounded p-1.5 opacity-65">Distribución</div>
                  <div class="border border-[#7a8c6e] rounded p-1.5 opacity-65">Hoja cálculo</div>
                </div>
              `
            },
            2: {
              title: "Elegir 2 variables",
              pills: ["2 variables", "OK"],
              desc: "En la serie CW seleccioná <strong>2 variables</strong> y apretá <code>OK</code>.",
              miniTop: "Estadística",
              miniBody: "2 variables → [OK]",
              badge: "PASO 2/5",
              status: "ESTADÍSTICA",
              footer: "Bajá a 2 variables y apretá [OK]",
              banner: "Paso 2: Seleccioná '2 variables' y apretá OK",
              keys: ['key-dpad', 'key-ok'],
              html: `
                <div class="space-y-1 text-xs">
                  <div class="px-2 py-1 opacity-70">1 variable</div>
                  <div class="px-2 py-1.5 bg-[#141e12] text-[#d3dec8] font-bold rounded">2 variables   [OK]</div>
                </div>
              `
            },
            3: {
              title: "Cargar la tabla x e y con EXE / =",
              pills: ["Valor", "="],
              desc: "Se abre la tabla con columnas <code>x</code> e <code>y</code>. Cargá los valores confirmando cada uno con <code>EXE</code> (tecla <code>=</code>).",
              miniTop: `Tabla (${ds.name})`,
              miniBody: `1: ${ds.rows[0].x} | ${ds.rows[0].y}`,
              badge: "PASO 3/5",
              status: `TABLA (n=${ds.n})`,
              footer: "Cargá cada dato y apretá [EXE / =]",
              banner: "Paso 3: Escribí cada valor y confirmalo con EXE (=)",
              keys: ['key-2', 'key-4', 'key-5', 'key-6', 'key-7', 'key-eq', 'key-dpad'],
              html: `
                <table class="w-full text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-[#7a8c6e]">
                      <th class="text-left py-0.5 w-6">#</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">x</th>
                      <th class="text-center py-0.5 border-l border-[#7a8c6e]">y</th>
                    </tr>
                  </thead>
                  <tbody>${tableRowsHtml}</tbody>
                </table>
              `
            },
            4: {
              title: "Apretar OK → Resultados de regresión → y=a+bx",
              pills: ["OK", "Resultados de regresión", "y=a+bx"],
              desc: "Con los datos cargados, apretá <code>OK</code>, elegí <strong>Resultados de regresión</strong> (<em>Regression Results</em>) y luego <strong>y=a+bx</strong>. Muestra <code>a</code>, <code>b</code> y <code>r</code> en pantalla.",
              miniTop: "OK → Result. regresión",
              miniBody: `a=${ds.a} b=${ds.b} r=${ds.rShort}`,
              badge: "PASO 4/5",
              status: "OK → RESULT. REGRESIÓN",
              footer: "Resultados de regresión → y=a+bx",
              banner: "Paso 4: Apretá OK → Resultados de regresión → y=a+bx",
              keys: ['key-ok', 'key-dpad'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  Resultados de regresión (y=a+bx)
                </div>
                <div class="space-y-0.5 text-xs font-bold">
                  <div class="flex justify-between"><span>a =</span><span>${ds.a}</span></div>
                  <div class="flex justify-between"><span>b =</span><span>${ds.b}</span></div>
                  <div class="flex justify-between bg-[#141e12] text-[#d3dec8] px-1 rounded"><span>r =</span><span>${ds.r}</span></div>
                </div>
              `
            },
            5: {
              title: "Calcular R² aparte",
              pills: ["x²", "="],
              desc: "Elevá <code>r</code> al cuadrado apretando <code>x²</code> y <code>EXE (=)</code>.",
              miniTop: "r²",
              miniBody: `(${ds.rShort})² = ${ds.r2}`,
              badge: "PASO 5/5",
              status: "CALCULAR R²",
              footer: "Elevá r al cuadrado con [x²] y [=]",
              banner: "Paso 5: Elevá r al cuadrado apretando x² y =",
              keys: ['key-x2', 'key-eq'],
              html: `
                <div class="space-y-1.5">
                  <div class="text-xs opacity-80">Determinación R² = r²:</div>
                  <div class="text-sm font-bold">(${ds.rShort})²</div>
                  <div class="text-right text-base font-bold bg-[#141e12] text-[#d3dec8] px-2 py-0.5 rounded">
                    R² = ${ds.r2}
                  </div>
                </div>
              `
            },
            sums: {
              title: "Ver sumas (Σx, Σy, Σxy, Σx²) en Resultados de 2 variables",
              pills: ["OK", "Resultados de 2 variables"],
              desc: "Desde la tabla apretá <code>OK</code> y elegí <strong>Resultados de 2 variables</strong> (<em>2-Variable Results</em>). Deslizá con <code>▼</code> para ver todas las sumas.",
              miniTop: "Resultados 2-Var",
              miniBody: `Σx=${ds.sx} Σxy=${ds.sxy}`,
              badge: "SUMATORIAS",
              status: "OK → Result. 2-Var",
              footer: "Bajá con [▼] para ver todas las sumas",
              banner: "Sumatorias: Apretá OK y elegí 'Resultados de 2 variables'",
              keys: ['key-ok', 'key-dpad'],
              html: `
                <div class="text-xs font-bold border-b border-[#7a8c6e] pb-0.5 mb-1">
                  Resultados 2-Var (${ds.name})
                </div>
                <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs font-bold">
                  <div class="flex justify-between"><span>Σx</span><span>=${ds.sx}</span></div>
                  <div class="flex justify-between"><span>Σy</span><span>=${ds.sy}</span></div>
                  <div class="flex justify-between"><span>Σx²</span><span>=${ds.sx2}</span></div>
                  <div class="flex justify-between"><span>Σy²</span><span>=${ds.sy2}</span></div>
                  <div class="flex justify-between col-span-2 bg-[#141e12] text-[#d3dec8] px-1 rounded"><span>Σxy = ${ds.sxy}</span><span>n = ${ds.n}</span></div>
                </div>
              `
            }
          }
        }
      };
    }

    function selectDataset(dsKey) {
      currentDataset = dsKey;
      ['ej12', 'kaggle'].forEach(k => {
        const btn = document.getElementById('ds-' + k);
        if (k === dsKey) btn.classList.add('dataset-tab-active');
        else btn.classList.remove('dataset-tab-active');
      });
      document.getElementById('active-dataset-pill').textContent = 'Datos activos: ' + datasets[dsKey].name;
      buildStepsList(currentModel);
      selectStep(currentStep);
      updatePracticePanel();
    }

    function buildStepsList(modelKey) {
      const modelsData = getModelsData(datasets[currentDataset]);
      const m = modelsData[modelKey];
      const container = document.getElementById('steps-container');
      let html = '';

      for (let i = 1; i <= 5; i++) {
        const s = m.steps[i];
        const pillsHtml = s.pills.map((p, idx) =>
          `<span class="key-btn ${idx === 0 ? 'key-accent' : ''}">${p}</span>`
        ).join('<span class="text-xs text-[var(--muted-foreground)]">→</span>');

        html += `
          <div tabindex="0" role="button" data-click="selectStep(${i})" id="step-card-${i}" class="step-card cursor-pointer transition-all bg-[var(--card)] border-2 border-[var(--border)] rounded-xl p-3.5 shadow-sm hover:border-[#a92382]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-start gap-3 flex-1">
                <div class="w-7 h-7 rounded-lg u-btn-primary font-bold flex items-center justify-center shrink-0 text-xs">${i}</div>
                <div class="space-y-1">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <h3 class="font-bold text-sm text-[var(--foreground)]">${s.title}</h3>
                    ${pillsHtml}
                  </div>
                  <p class="text-xs text-[var(--muted-foreground)]">${s.desc}</p>
                </div>
              </div>
              <div class="mini-lcd rounded-lg p-2 w-full sm:w-44 shrink-0 text-xs">
                <div class="border-b border-[#7a8c6e] pb-0.5 mb-1 font-bold">${s.miniTop}</div>
                <div class="bg-[#141e12] text-[#d3dec8] rounded px-1.5 py-0.5 font-bold">${s.miniBody}</div>
              </div>
            </div>
          </div>
        `;
      }

      const b = m.steps.sums;
      const bonusPills = b.pills.map(p => `<span class="key-btn">${p}</span>`).join(' ');
      html += `
        <div tabindex="0" role="button" data-click="showSumsInLCD()" id="step-card-sums" class="step-card cursor-pointer transition-all bg-[var(--card)] border-2 border-dashed border-[var(--border)] rounded-xl p-3.5 shadow-sm hover:border-[#a92382]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="space-y-1 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded u-pill text-xs font-bold uppercase">Sumatorias</span>
                <h3 class="font-bold text-xs text-[var(--foreground)]">${b.title}</h3>
                ${bonusPills}
              </div>
              <p class="text-xs text-[var(--muted-foreground)]">${b.desc}</p>
            </div>
            <div class="mini-lcd rounded-lg p-2 w-full sm:w-44 shrink-0 text-xs font-bold">
              <div class="border-b border-[#7a8c6e] pb-0.5 mb-0.5">${b.miniTop}</div>
              <div>${b.miniBody}</div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;
      applyGoalFilter();
    }

    function updateCalculatorAppearance(modelKey) {
      const modelsData = getModelsData(datasets[currentDataset]);
      const m = modelsData[modelKey];
      const chassis = document.getElementById('calc-chassis-box');
      chassis.className = `${m.chassisClass} rounded-[2.2rem] p-5 text-white max-w-[375px] mx-auto select-none transition-all`;

      document.getElementById('steps-section-title').textContent = m.title;
      document.getElementById('model-header-desc').textContent = m.headerDesc;
      document.getElementById('calc-model-label').textContent = m.modelLabel;
      document.getElementById('calc-series-badge').textContent = m.seriesBadge;
      document.getElementById('calc-sub-badge').textContent = m.subBadge;
      document.getElementById('key-menu').textContent = m.menuKeyText;
      document.getElementById('label-menu-mode').textContent = m.menuTopLabel;
      document.getElementById('key-optn').textContent = m.optnKeyText;
      document.getElementById('key-mplus').textContent = m.mplusKeyText;
      document.getElementById('key-ok').textContent = m.okText;

      const delBtn = document.getElementById('key-del');
      const acBtn = document.getElementById('key-ac');
      if (m.acBlue) {
        delBtn.className = 'cw-key cw-key-blue h-9 rounded-lg font-bold text-xs';
        acBtn.className = 'cw-key cw-key-blue h-9 rounded-lg font-bold text-xs';
      } else {
        delBtn.className = 'cw-key cw-key-orange h-9 rounded-lg font-bold text-xs';
        acBtn.className = 'cw-key cw-key-orange h-9 rounded-lg font-bold text-xs';
      }

      const sub1 = document.getElementById('sublabel-key-1');
      const sub2 = document.getElementById('sublabel-key-2');
      if (m.showStatSublabels) {
        sub1.classList.remove('hidden');
        sub1.classList.add('absolute');
        sub1.textContent = modelKey === 'ms' ? 'S-SUM' : 'STAT';
        sub2.classList.remove('hidden');
        sub2.classList.add('absolute');
        sub2.textContent = modelKey === 'ms' ? 'S-VAR' : '';
      } else {
        sub1.classList.add('hidden');
        sub2.classList.add('hidden');
      }
    }

    function selectModel(modelKey) {
      currentModel = modelKey;
      ['classwiz', 'esplus', 'ms', 'cw'].forEach(k => {
        const tab = document.getElementById('tab-' + k);
        if (k === modelKey) tab.classList.add('model-tab-active');
        else tab.classList.remove('model-tab-active');
      });

      updateCalculatorAppearance(modelKey);
      buildStepsList(modelKey);
      selectStep(1);
      updatePracticePanel();
    }

    function applyGoalFilter() {
      const allowed = new Set(goals[currentGoal].steps);
      for (let i = 1; i <= 5; i++) {
        const card = document.getElementById('step-card-' + i);
        if (card) card.classList.toggle('goal-hidden', !allowed.has(i));
      }
      const sumsCard = document.getElementById('step-card-sums');
      if (sumsCard) sumsCard.classList.toggle('goal-hidden', !allowed.has('sums'));
    }

    function updatePracticePanel() {
      const goal = goals[currentGoal];
      const model = getModelsData(datasets[currentDataset])[currentModel];
      Object.keys(goals).forEach(key => {
        const button = document.getElementById('goal-' + key);
        if (button) button.classList.toggle('is-selected', key === currentGoal);
      });
      document.getElementById('practice-mission-title').textContent = goal.label;
      document.getElementById('practice-mission-copy').textContent = goal.copy;
      document.getElementById('compatibility-note').innerHTML = `<strong>Modelo seleccionado:</strong> ${model.modelLabel}. Las rutas son orientativas para esta familia; seguí el nombre que aparezca en la pantalla de tu calculadora.`;
    }

    function selectGoal(goalKey) {
      currentGoal = goalKey;
      updatePracticePanel();
      buildStepsList(currentModel);
      selectStep(1);
      const feedback = document.getElementById('practice-feedback');
      feedback.hidden = true;
      feedback.innerHTML = '';
    }

    function setPracticeFeedback(html) {
      const feedback = document.getElementById('practice-feedback');
      feedback.hidden = false;
      feedback.innerHTML = html;
    }

    function showPracticeHint() {
      setPracticeFeedback(`<strong>Pista:</strong> ${goals[currentGoal].hint}`);
    }

    function showPracticeMenu() {
      const model = getModelsData(datasets[currentDataset])[currentModel];
      const route = goals[currentGoal].steps.filter(step => step !== 'sums');
      const firstAction = model.steps[route[0]].pills.join(' → ');
      setPracticeFeedback(`<strong>Buscá primero:</strong> ${firstAction}. Después seguí los pasos visibles de la guía para <strong>${goals[currentGoal].label.toLowerCase()}</strong>.`);
    }

    function revealPractice() {
      const model = getModelsData(datasets[currentDataset])[currentModel];
      const route = goals[currentGoal].steps.map(step => step === 'sums' ? model.steps.sums : model.steps[step]);
      const routeHtml = route.map((step, index) => `<li><strong>${index + 1}. ${step.title}:</strong> ${step.pills.join(' → ')}</li>`).join('');
      setPracticeFeedback(`<strong>Ruta completa:</strong><ol>${routeHtml}</ol><p>${goals[currentGoal].result(datasets[currentDataset])}</p>`);
    }

    function resetGuide() {
      selectStep(1);
      document.getElementById('sec-calculadora').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPracticeFeedback('<strong>Volvimos al paso 1.</strong> Revisá el nombre del menú en la pantalla de tu modelo y seguí los pasos visibles.');
    }

    function printSummary() {
      const model = getModelsData(datasets[currentDataset])[currentModel];
      const route = goals[currentGoal].steps.map(step => step === 'sums' ? model.steps.sums : model.steps[step]);
      const routeHtml = route.map(step => {
        const keys = step.pills.map(key => `<span class="print-key">${key}</span>`).join(' → ');
        return `<li><strong>${step.title}:</strong> ${keys}</li>`;
      }).join('');
      document.getElementById('print-summary').innerHTML = `
        <header class="print-header"><p>Guía de estudio · correlación y regresión lineal</p><h1>Ruta rápida Casio</h1></header>
        <main class="print-body">
          <div class="print-meta"><p><strong>Modelo</strong><br>${model.modelLabel}</p><p><strong>Datos</strong><br>${datasets[currentDataset].name}</p><p><strong>Objetivo</strong><br>${goals[currentGoal].label}</p></div>
          <h2>Ruta de teclas</h2><ol class="print-route">${routeHtml}</ol>
          <div class="print-result"><h2>Resultado para comparar</h2><p>${goals[currentGoal].result(datasets[currentDataset])}</p></div>
          <p>Guiate por el nombre de cada opción que aparezca en la pantalla de tu calculadora: los números pueden variar entre variantes de una misma familia.</p>
        </main>
      `;
      window.print();
    }

    function setTheme(theme) {
      const dark = theme === 'dark';
      document.body.classList.toggle('theme-dark', dark);
      const button = document.getElementById('theme-toggle');
      const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', label);
      document.getElementById('theme-toggle-label').textContent = label;
      localStorage.setItem('guia-casio-theme', dark ? 'dark' : 'light');
    }

    function toggleTheme() {
      setTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
    }

    function highlightKeys(activeKeys) {
      allKeyIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('key-glow');
      });
      activeKeys.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('key-glow');
      });
    }

    function selectStep(step) {
      currentStep = step;
      for (let i = 1; i <= 5; i++) {
        const card = document.getElementById('step-card-' + i);
        if (card) {
          if (i === step) card.classList.add('step-active');
          else card.classList.remove('step-active');
        }
      }
      const sumsCard = document.getElementById('step-card-sums');
      if (sumsCard) sumsCard.classList.remove('step-active');

      const modelsData = getModelsData(datasets[currentDataset]);
      renderScreen(modelsData[currentModel].steps[step]);
    }

    function showSumsInLCD() {
      for (let i = 1; i <= 5; i++) {
        const card = document.getElementById('step-card-' + i);
        if (card) card.classList.remove('step-active');
      }
      const sumsCard = document.getElementById('step-card-sums');
      if (sumsCard) sumsCard.classList.add('step-active');

      const modelsData = getModelsData(datasets[currentDataset]);
      renderScreen(modelsData[currentModel].steps.sums);
    }

    function renderScreen(data) {
      const modelsData = getModelsData(datasets[currentDataset]);
      document.getElementById('sim-step-badge').textContent = data.badge;
      document.getElementById('lcd-status').textContent = data.status;
      document.getElementById('lcd-body').innerHTML = data.html;
      document.getElementById('lcd-footer-model').textContent = modelsData[currentModel].modelLabel.split('/')[0].trim();
      document.getElementById('lcd-footer-hint').textContent = data.footer;
      document.getElementById('calc-action-banner').textContent = data.banner;
      highlightKeys(data.keys || []);
    }

    function nextStep() {
      const next = currentStep < 5 ? currentStep + 1 : 1;
      selectStep(next);
    }

    function prevStep() {
      const prev = currentStep > 1 ? currentStep - 1 : 5;
      selectStep(prev);
    }

    function setEx11Value(val) {
      document.getElementById('ex11-x-input').value = val;
      updateEx11Live();
    }

    function updateEx11Live() {
      const x = parseFloat(document.getElementById('ex11-x-input').value) || 0;
      const prod = 0.10 * x;
      const yHat = 159.62 - prod;
      const rounded = Math.round(yHat);
      const box = document.getElementById('ex11-live-box');
      box.innerHTML = `
        <div>Paso 1: ŷ = 159,62 − 0,10 · (${x})</div>
        <div>Paso 2: ŷ = 159,62 − ${prod.toFixed(2).replace('.', ',')} = <strong>${yHat.toFixed(2).replace('.', ',')}</strong></div>
        <div class="pt-1 border-t border-[var(--border)] text-sm font-bold text-[#8f1d70]">
          Redondeado al entero más cercano (variable discreta): ${rounded} victorias ${x === 800 ? '(Opción e. 80)' : ''}
        </div>
      `;
    }

    function checkEx11Sign(isCorrect) {
      const box = document.getElementById('ex11-sign-feedback');
      box.classList.remove('hidden');
      if (isCorrect) {
        box.className = 'text-xs rounded-lg p-2.5 border bg-[var(--secondary)] text-[var(--secondary-foreground)] u-accent-border';
        box.innerHTML = '<strong>Correcto.</strong> El signo menos de <code>b = −0,10</code> indica una <strong>relación lineal negativa (inversa)</strong>: a más carreras permitidas (x), se esperan menos victorias (y).';
      } else {
        box.className = 'text-xs rounded-lg p-2.5 border bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]';
        box.innerHTML = '<strong>Atención al signo:</strong> como delante de <code>0,10</code> hay un signo menos (<code>−0,10</code>), al crecer <code>x</code> estás restando más, por lo que <code>y</code> disminuye.';
      }
    }

    function setKaggleHours(h) {
      document.getElementById('kaggle-slider').value = h;
      updateKaggleLive();
    }

    function updateKaggleLive() {
      const x = parseFloat(document.getElementById('kaggle-slider').value) || 0;
      document.getElementById('kaggle-x-label').textContent = x.toFixed(2).replace('.', ',') + ' h';
      const prod = 4.9965 * x;
      const rawYHat = 41.3935 + prod;
      const box = document.getElementById('kaggle-live-box');
      box.innerHTML = `
        <div>Paso 1: ŷ = 41,3935 + 4,9965 · (${x.toFixed(2).replace('.', ',')})</div>
        <div>Paso 2: ŷ = 41,3935 + ${prod.toFixed(4).replace('.', ',')}</div>
        <div class="pt-1 border-t border-[var(--border)] text-sm font-bold text-[#8f1d70]">
          Calificación estimada: ŷ = ${rawYHat.toFixed(4).replace('.', ',')} puntos
        </div>
      `;
    }

    const tp6Exercises = {
      1: {
        title: "Ejercicio 1 · Gráfico de dispersión ascendente",
        question: "Determina el tipo de asociación aparente en el gráfico de dispersión (nube de puntos que sube de izquierda a derecha de forma bien alineada).",
        answer: "Opción a: Asociación Positiva, asociación lineal, asociación muy fuerte",
        explanation: "Los puntos suben de izquierda a derecha (dirección positiva), siguen una trayectoria recta (forma lineal) y están muy concentrados alrededor de esa recta (fuerza muy fuerte)."
      },
      2: {
        title: "Ejercicio 2 · Interpretación de r = 0,73 en béisbol",
        question: "Se analiza la relación entre juegos ganados y asistencia promedio. La regresión lineal tiene r = 0,73. Interpreta esta estadística.",
        answer: "Opción a: Relación lineal positiva, bastante fuerte. El 53,29% de la variación en la asistencia promedio se explica por el número de juegos ganados.",
        explanation: "Como r = +0,73 > 0, la relación es lineal positiva y bastante fuerte. Para saber qué porcentaje de la variación explica el modelo, se calcula el coeficiente de determinación: R² = (0,73)² = 0,5329 = 53,29%."
      },
      3: {
        title: "Ejercicio 3 · Predicción de peso según altura",
        question: "La ecuación para pronosticar el peso (y, en libras) basado en la altura (x, en pulgadas) es y = −172,63 + 4,842x. ¿Cuál es la mejor predicción para x = 70 pulgadas? Redondea al entero más próximo.",
        answer: "Opción b: 166",
        explanation: "Sustituyendo x = 70 en la recta: y = −172,63 + 4,842 · (70) = −172,63 + 338,94 = 166,31 libras. Redondeando al entero más próximo se obtiene 166."
      },
      4: {
        title: "Ejercicio 4 · Horas de ejercicio por semana y altura",
        question: "¿Esperarías que la cantidad de tiempo dedicado a hacer ejercicio por semana y la altura de 200 adultos tengan asociación positiva, negativa o ninguna?",
        answer: "Opción b: ninguna asociación",
        explanation: "En personas adultas (18 a 32 años), la estatura no depende ni determina cuántas horas por semana deciden entrenar; son variables independientes (correlación nula)."
      },
      5: {
        title: "Ejercicio 5 · Longitud del fémur (x) y longitud del húmero (y)",
        question: "Dada la longitud del fémur de una persona (x) y la longitud de su húmero (y), ¿esperarías correlación positiva, negativa o ninguna?",
        answer: "Opción b: correlación positiva",
        explanation: "Por proporcionalidad anatómica, las personas de mayor estatura tienen tanto el fémur más largo como el húmero más largo: cuando X aumenta, Y también aumenta."
      },
      6: {
        title: "Ejercicio 6 · Consumo de electricidad y tamaño del hogar",
        question: "Se predice la electricidad usada en julio (kWh) en función del tamaño del hogar (pies cuadrados). ¿La pendiente es positiva o negativa? ¿Por qué?",
        answer: "Opción d: Positiva. Las casas más grandes deberían usar más electricidad.",
        explanation: "A mayor superficie de la vivienda (X aumenta), mayor demanda de climatización e iluminación (Y aumenta), por lo que la pendiente b es positiva."
      },
      7: {
        title: "Ejercicio 7 · Casos diagnosticados desde 2002 en adelante",
        question: "El gráfico muestra los casos de una enfermedad entre 1991 y 2011 (sube hasta 2002 y luego baja de forma sostenida entre 2002 y 2011). Considerando solo los datos de 2002 en adelante, ¿cómo es la asociación lineal?",
        answer: "Opción a: fuerte y negativa",
        explanation: "En el tramo 2002–2011 los puntos descienden alineados en línea recta: a medida que avanzan los años (X sube), la cantidad de casos diagnosticados disminuye (Y baja) con fuerte concentración lineal."
      },
      8: {
        title: "Ejercicio 8 · Gráfico de dispersión descendente",
        question: "Determina el tipo de asociación aparente en el gráfico de dispersión (nube de puntos que baja de izquierda a derecha muy alineada).",
        answer: "Opción d: asociación negativa, asociación lineal, asociación muy fuerte",
        explanation: "Los puntos bajan de izquierda a derecha (dirección negativa), forman una trayectoria recta clara (lineal) y presentan baja dispersión (muy fuerte)."
      },
      9: {
        title: "Ejercicio 9 · Definición de asociación negativa",
        question: "Una asociación _________ entre dos variables cuantitativas X e Y está presente si Y tiende a disminuir cuando X tiende a crecer.",
        answer: "Opción c: negativa",
        explanation: "Cuando las variables se mueven en sentido inverso (X crece e Y disminuye), la dirección de la asociación es negativa."
      },
      10: {
        title: "Ejercicio 10 · Edad de un automóvil y su precio",
        question: "Para la relación entre la edad de un automóvil y su precio, la regresión tiene r² = 87,1%. Describe la relación.",
        answer: "Opción d: Relación lineal negativa y fuerte. A medida que la edad aumenta, el precio disminuye.",
        explanation: "A partir de r² = 0,871 se obtiene el módulo |r| = √0,871 ≈ 0,933 (cercano a 1, relación lineal fuerte). Como al aumentar la antigüedad del vehículo su precio disminuye, el sentido es negativo: r ≈ −0,933."
      },
      11: {
        title: "Ejercicio 11 · Liga de béisbol de verano",
        question: "La ecuación que predice las victorias (y) según las carreras permitidas (x) es y = 159,62 − 0,10x. ¿Cuál es el número predicho de victorias para x = 800 carreras? Redondea al entero más cercano.",
        answer: "Opción e: 80",
        explanation: "Sustituyendo x = 800: y = 159,62 − 0,10 · (800) = 159,62 − 80 = 79,62. Al tratarse de una variable discreta (cantidad de victorias), se redondea al entero más cercano: 80."
      },
      12: {
        title: "Ejercicio 12 · Recta de regresión de 4 pares",
        question: "Encuentra la recta de regresión para los datos: (2, 7), (4, 11), (5, 13), (6, 20).",
        answer: "Opción d: y = 3x",
        explanation: "Con Σx = 17, Σy = 51, Σxy = 243, Σx² = 81 y n = 4: la pendiente es b = (4·243 − 17·51) / (4·81 − 17²) = 105 / 35 = 3, y la ordenada al origen es a = (51 − 3·17) / 4 = 0. Por lo tanto, y = 0 + 3x ⇒ y = 3x."
      }
    };

    function buildTp6Bank() {
      const btnContainer = document.getElementById('tp6-buttons');
      let html = '';
      for (let i = 1; i <= 12; i++) {
        html += `
          <button data-click="selectTp6(${i})" id="tp6-btn-${i}" class="py-2 px-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-bold transition hover:border-[#a92382] flex flex-col items-center">
            <span>Ej. ${i}</span>
            <span class="text-[12px] font-normal opacity-75">TP6</span>
          </button>
        `;
      }
      btnContainer.innerHTML = html;
      selectTp6(12);
    }

    function selectTp6(num) {
      for (let i = 1; i <= 12; i++) {
        const b = document.getElementById('tp6-btn-' + i);
        if (i === num) b.classList.add('model-tab-active');
        else b.classList.remove('model-tab-active');
      }
      const ex = tp6Exercises[num];
      document.getElementById('tp6-detail-box').innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
          <h3 class="font-bold text-base text-[var(--foreground)]">${ex.title}</h3>
          <span class="px-2.5 py-0.5 rounded u-pill text-xs font-bold">Banco del TP6</span>
        </div>
        <p class="text-xs text-[var(--muted-foreground)]"><strong>Enunciado:</strong> ${ex.question}</p>
        <div class="p-3 rounded-lg bg-[var(--secondary)] text-[var(--secondary-foreground)] text-xs font-bold">
          Respuesta correcta: ${ex.answer}
        </div>
        <p class="text-xs text-[var(--foreground)] leading-relaxed">
          <strong>Desarrollo y justificación:</strong> ${ex.explanation}
        </p>
      `;
    }

    selectModel('classwiz');
    setTheme(localStorage.getItem('guia-casio-theme') === 'dark' ? 'dark' : 'light');
    updateEx11Live();
    updateKaggleLive();
    buildTp6Bank();

const actions = { selectDataset, selectModel, selectStep, selectTp6, nextStep, prevStep,
  showSumsInLCD, setEx11Value, checkEx11Sign, setKaggleHours, updateEx11Live, updateKaggleLive,
  selectGoal, showPracticeHint, showPracticeMenu, revealPractice, resetGuide, printSummary, toggleTheme };
function runAction(element, name) {
  const match = element.dataset[name]?.match(/^(\w+)\((.*)\)$/);
  if (!match || !Object.hasOwn(actions, match[1])) return;
  const raw = match[2];
  const value = raw === '' ? undefined : raw === 'true' ? true : raw === 'false' ? false
    : /^-?\d+(?:\.\d+)?$/.test(raw) ? Number(raw) : raw.replace(/^['"]|['"]$/g, '');
  actions[match[1]](value);
}
document.addEventListener('click', event => {
  const target = event.target.closest('[data-click]');
  if (target) runAction(target, 'click');
});
document.addEventListener('input', event => {
  const target = event.target.closest('[data-input]');
  if (target) runAction(target, 'input');
});
document.addEventListener('keydown', event => {
  const target = event.target.closest('[role="button"][data-click]');
  if (target && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); runAction(target, 'click'); }
});
