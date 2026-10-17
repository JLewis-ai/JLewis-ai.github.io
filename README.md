# Personal website

A fast, responsive portfolio designed for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

## Personalise it

Open `content.js` and replace the sample name, biography, email address, projects, and social links. Most content lives in this one file.

You can change the visual palette at the top of `styles.css`.

## Preview locally

From this folder, run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public GitHub repository named `YOUR-USERNAME.github.io`.
2. Upload every file in this folder to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Visit `https://YOUR-USERNAME.github.io` after GitHub finishes publishing.

For a normal repository name such as `portfolio`, the site URL will be `https://YOUR-USERNAME.github.io/portfolio/`. This site uses relative asset paths, so both URL styles work.

## Custom domain

Add the domain under **Settings → Pages → Custom domain**, then follow GitHub's DNS instructions. Enable **Enforce HTTPS** when it becomes available.
