def is_Chinese(ch):
    if '\u4e00' <= ch <= '\u9fff':
        return True
    return False

def text_width(text):
    return len(text) + sum(is_Chinese(ch) for ch in text)

def ljust(text, width, fillchar=' '):
    return text + fillchar * (width - text_width(text))

def rjust(text, width, fillchar=' '):
    return fillchar * (width - text_width(text)) + text

def center(text, width, fillchar=' '):
    return fillchar * (width - text_width(text)) + text + fillchar * (width - text_width(text))

def special_text(text, *describer):
    str_pfix = ""
    for i in describer:
        str_pfix += "\033["+i
    return str_pfix + text + "\033[0m"