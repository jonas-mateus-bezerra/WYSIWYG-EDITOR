type EditorContext = HTMLElement;

function applyElementWithSign(tag: string, selection: Selection): void {
  const element = document.createElement(tag);
  const range = new Range();
  const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
  const invalidSelection = !anchorNode || !focusNode; 

  if (invalidSelection) {
    return;
  }

  range.setStart(anchorNode, anchorOffset);
  range.setEnd(focusNode, focusOffset);
  range.surroundContents(element);
}

function inspectUserSelection(event: Event, editorContext: EditorContext): void {
  const select = event.target as HTMLSelectElement;
  const tag = select.value;
  
  const selection = document.getSelection();
  const isSelectionInsideEditionArea = selection && selection.anchorNode && editorContext.contains(selection.anchorNode);

  if (isSelectionInsideEditionArea) {
    applyElementWithSign(tag, selection);
  }
}

function enableStylingFeatures(editorContext: EditorContext): void {
  const titleSelect = document.querySelector<HTMLSelectElement>('.format-select');
  const boldButton = document.querySelector<HTMLButtonElement>('.btn-bold');
  const underlineButton = document.querySelector<HTMLButtonElement>('.btn-underline');
  const italicButton = document.querySelector<HTMLButtonElement>('.btn.italic');
  const quotesButton = document.querySelector<HTMLButtonElement>('.bnt-quote');
  const fontColorButton = document.querySelector<HTMLButtonElement>('.btn-color');

  if (titleSelect) {
    titleSelect.addEventListener('change', (e) => inspectUserSelection(e, editorContext));
  }

  boldButton?.addEventListener('click', () => {
    document.execCommand('bold', false, undefined);
  });

  underlineButton?.addEventListener('click', () => {
    document.execCommand('underline', false, undefined);
  });

  italicButton?.addEventListener('click', () => {
    document.execCommand('italic', false, undefined);
  });

  quotesButton?.addEventListener('click', () => {
    document.execCommand('formatBlock', false, '<blockquote>');
    document.execCommand('italic', false, undefined);
  });

  fontColorButton?.addEventListener('click', () => {
    const fontColor = window.prompt('Type the font color:');
    if (fontColor !== null) {
      document.execCommand('forecolor', false, fontColor);
    }
  });
}

function setupEditor(mainElement: EditorContext): void {
  mainElement.contentEditable = 'true';
  mainElement.style.fontFamily = 'Arial, sans-serif';

  enableStylingFeatures(mainElement);
}

document.addEventListener('DOMContentLoaded', () => {
  const mainEditor = document.querySelector<HTMLElement>('main.editor-content');

  if (!mainEditor) {
    console.warn('Elemento <main> com classe "editor-content" não encontrado.');
    return;
  }

  setupEditor(mainEditor);
});

