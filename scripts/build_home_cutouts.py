"""Gera recortes transparentes apenas de fotos oficiais com fundo simples.

O original permanece no repositório para conferência da origem. Os PNGs
gerados são usados exclusivamente no carrossel, não no catálogo.
"""
from pathlib import Path

from PIL import Image
from rembg import new_session, remove

ASSETS = Path(__file__).resolve().parents[1] / "public" / "store"
SLIDES = (4, 6, 7)

def main():
    session = new_session("u2netp")
    for number in SLIDES:
        source = ASSETS / f"home-slide-{number}.jpeg"
        target = ASSETS / f"home-slide-{number}-cutout.png"
        image = Image.open(source).convert("RGBA")
        cutout = remove(image, session=session).convert("RGBA")

        # Descarta transparência residual que poderia formar uma borda cinza.
        alpha = cutout.getchannel("A")
        alpha = alpha.point(lambda v: 0 if v < 12 else v)
        cutout.putalpha(alpha)
        bbox = cutout.getbbox()
        if bbox is None:
            raise RuntimeError(f"Não foi possível isolar o tênis: {source.name}")

        left, top, right, bottom = bbox
        if (right - left) * (bottom - top) < 0.04 * image.width * image.height:
            raise RuntimeError(f"Recorte suspeito, muito pequeno: {source.name}")

        margin = max(6, round(max(image.size) * 0.012))
        left, top = max(0, left - margin), max(0, top - margin)
        right, bottom = min(image.width, right + margin), min(image.height, bottom + margin)
        cropped = cutout.crop((left, top, right, bottom))
        cropped.save(target, optimize=True)
        print(f"{source.name}: {image.size} => {target.name}: {cropped.size}")

if __name__ == "__main__":
    main()
