
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx'
import pptxgen from 'pptxgenjs'
import * as XLSX from 'xlsx'

export type ExportSettings = {
  title?: string
  university?: string
  fontSize?: number
  fontFace?: string
  textColor?: string
  headingColor?: string
  includeCover?: boolean
  includePageNumbers?: boolean
  margin?: number
}

function cleanFileName(value: string) {
  return value
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, '-')
    .slice(0, 100) || 'hadeel-document'
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

function downloadBytes(
  bytes: Uint8Array,
  mimeType: string,
  fileName: string
) {
  const blob = new Blob([bytes], { type: mimeType })
  downloadBlob(blob, fileName)
}

function normalizeColor(value?: string, fallback = '2459A9') {
  const color = (value || fallback).replace('#', '').trim()
  return /^[0-9a-fA-F]{6}$/.test(color) ? color : fallback
}

function parseMarkdown(content: string) {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
}

function plainText(line: string) {
  return line
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\s*[-*+]\s+/, '• ')
    .replace(/^\s*\d+[.)]\s+/, '• ')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')
    .trim()
}

function isHeading(line: string) {
  return /^#{1,3}\s+/.test(line)
}

function isMainHeading(line: string) {
  return /^#\s+/.test(line)
}

function getSections(content: string) {
  const lines = parseMarkdown(content)
  const sections: { heading: string; lines: string[] }[] = []
  let current = { heading: '', lines: [] as string[] }

  for (const line of lines) {
    if (isMainHeading(line) && current.lines.length) {
      sections.push(current)
      current = { heading: plainText(line), lines: [] }
    } else {
      current.lines.push(line)
    }
  }

  if (current.heading || current.lines.length) {
    sections.push(current)
  }

  return sections
}

export async function exportWord(
  content: string,
  settings: ExportSettings = {}
) {
  const title = settings.title || 'مستند منصة هديل'
  const fontFace = settings.fontFace || 'Arial'
  const fontSize = Math.max(9, Math.min(24, settings.fontSize || 14))
  const margin = Math.max(1, Math.min(3, settings.margin || 2))
  const headingColor = normalizeColor(settings.headingColor)
  const children: Paragraph[] = []

  if (settings.includeCover !== false) {
    children.push(
      new Paragraph({
        text: 'منصة هديل',
        alignment: AlignmentType.CENTER,
        spacing: { before: 1800, after: 500 },
        children: [
          new TextRun({
            text: 'منصة هديل',
            bold: true,
            size: 36,
            color: headingColor,
            font: fontFace,
          }),
        ],
      }),
      new Paragraph({
        text: title,
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.TITLE,
        spacing: { before: 400, after: 300 },
      })
    )

    if (settings.university) {
      children.push(
        new Paragraph({
          text: settings.university,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        })
      )
    }

    children.push(
      new Paragraph({
        text: 'إعداد: منصة هديل',
        alignment: AlignmentType.CENTER,
        spacing: { before: 300, after: 900 },
      }),
      new Paragraph({ children: [], pageBreakBefore: true })
    )
  }

  for (const line of parseMarkdown(content)) {
    if (!line.trim()) {
      children.push(new Paragraph({ text: '' }))
      continue
    }

    const heading = /^(#{1,6})\s+/.exec(line)
    const text = plainText(line)
    const bullet = /^\s*[-*+]\s+/.test(line) ||
      /^\s*\d+[.)]\s+/.test(line)

    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { before: heading ? 180 : 40, after: 100 },
        ...(heading
          ? {
              heading:
                heading[1].length === 1
                  ? HeadingLevel.HEADING_1
                  : heading[1].length === 2
                    ? HeadingLevel.HEADING_2
                    : HeadingLevel.HEADING_3,
            }
          : {}),
        bullet: bullet ? { level: 0 } : undefined,
        children: [
          new TextRun({
            text,
            font: fontFace,
            size: fontSize * 2,
            color: heading ? headingColor : normalizeColor(settings.textColor, '243247'),
            bold: Boolean(heading),
          }),
        ],
      })
    )
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: margin * 567,
              bottom: margin * 567,
              left: margin * 567,
              right: margin * 567,
            },
          },
        },
        children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  downloadBlob(blob, `${cleanFileName(title)}.docx`)
}

export async function exportPowerPoint(
  content: string,
  settings: ExportSettings = {}
) {
  const pptx = new pptxgen()
  pptx.layout = 'LAYOUT_WIDE'
  pptx.author = 'منصة هديل'
  pptx.subject = settings.title || 'عرض تقديمي'
  pptx.title = settings.title || 'عرض تقديمي'
  pptx.lang = 'ar-SA'
  pptx.theme = {
    headFontFace: settings.fontFace || 'Arial',
    bodyFontFace: settings.fontFace || 'Arial',
    lang: 'ar-SA',
  }

  const headingColor = normalizeColor(settings.headingColor)
  const textColor = normalizeColor(settings.textColor, '243247')
  const sections = getSections(content)
  const title = settings.title || 'عرض منصة هديل'

  if (settings.includeCover !== false) {
    const slide = pptx.addSlide()
    slide.background = { color: 'F7F9FC' }
    slide.addText('منصة هديل', {
      x: 0.8,
      y: 1.4,
      w: 11.7,
      h: 0.8,
      fontFace: settings.fontFace || 'Arial',
      fontSize: 30,
      bold: true,
      color: headingColor,
      align: 'center',
      rtlMode: true,
    })
    slide.addText(title, {
      x: 0.8,
      y: 2.4,
      w: 11.7,
      h: 1.2,
      fontFace: settings.fontFace || 'Arial',
      fontSize: 24,
      color: textColor,
      align: 'center',
      rtlMode: true,
      breakLine: false,
    })

    if (settings.university) {
      slide.addText(settings.university, {
        x: 0.8,
        y: 3.8,
        w: 11.7,
        h: 0.7,
        fontFace: settings.fontFace || 'Arial',
        fontSize: 18,
        color: textColor,
        align: 'center',
        rtlMode: true,
      })
    }
  }

  const paragraphs = parseMarkdown(content).filter((line) => line.trim())
  const chunks: string[][] = []
  let chunk: string[] = []

  for (const line of paragraphs) {
    if (chunk.length >= 6) {
      chunks.push(chunk)
      chunk = []
    }
    chunk.push(line)
  }

  if (chunk.length) chunks.push(chunk)

  if (!chunks.length) chunks.push(['لا يوجد محتوى'])

  for (const lines of chunks) {
    const slide = pptx.addSlide()
    slide.background = { color: 'FFFFFF' }

    const firstHeading = lines.find(isHeading)
    if (firstHeading) {
      slide.addText(plainText(firstHeading), {
        x: 0.55,
        y: 0.3,
        w: 12.2,
        h: 0.65,
        fontFace: settings.fontFace || 'Arial',
        fontSize: 24,
        bold: true,
        color: headingColor,
        align: 'right',
        rtlMode: true,
      })
    }

    const body = lines
      .filter((line) => line !== firstHeading)
      .map((line) => ({
        text: plainText(line),
        options: {
          breakLine: true,
          bullet: /^\s*[-*+]\s+/.test(line)
            ? { indent: 18 }
            : undefined,
          bold: isHeading(line),
        },
      }))

    slide.addText(body.length ? body : [{ text: ' ', options: {} }], {
      x: 0.7,
      y: firstHeading ? 1.2 : 0.6,
      w: 11.9,
      h: firstHeading ? 5.2 : 5.8,
      fontFace: settings.fontFace || 'Arial',
      fontSize: Math.max(12, Math.min(28, settings.fontSize || 18)),
      color: textColor,
      align: 'right',
      valign: 'top',
      paraSpaceAfterPt: 12,
      rtlMode: true,
      breakLine: false,
      margin: 0.15,
      fit: 'shrink',
    })

    slide.addText('منصة هديل', {
      x: 0.5,
      y: 7.05,
      w: 12.3,
      h: 0.2,
      fontSize: 9,
      color: '7B8794',
      align: 'center',
    })
  }

  await pptx.writeFile({ fileName: `${cleanFileName(title)}.pptx` })
}

export async function exportExcel(
  content: string,
  settings: ExportSettings = {}
) {
  const title = settings.title || 'بيانات منصة هديل'
  const rows: string[][] = []
  let activeSection = ''

  for (const line of parseMarkdown(content)) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (isHeading(trimmed)) {
      activeSection = plainText(trimmed)
      rows.push([activeSection])
      continue
    }

    if (trimmed.startsWith('|')) {
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim())

      if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue

      rows.push(cells)
      continue
    }

    rows.push([activeSection, plainText(trimmed)])
  }

  if (!rows.length) {
    rows.push(['المحتوى'], [content || 'لا يوجد محتوى'])
  }

  const worksheet = XLSX.utils.aoa_to_sheet(rows)
  worksheet['!cols'] = Array.from(
    { length: Math.max(1, ...rows.map((row) => row.length)) },
    () => ({ wch: 24 })
  )
  worksheet['!views'] = [{ rightToLeft: true }]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    cleanFileName(title).slice(0, 31) || 'هديل'
  )
  workbook.Props = {
    Title: title,
    Author: 'منصة هديل',
    Subject: settings.university || 'مستند تم إنشاؤه عبر منصة هديل',
  }

  const bytes = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  }) as Uint8Array

  downloadBytes(
    bytes,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    `${cleanFileName(title)}.xlsx`
  )
}
