Public files for Downloads

Place all downloadable files (resume, marksheets, etc.) inside the `public/files` folder. Files placed here are served statically by Vite at the root path `/files/<filename>`.

Files the app expects by default (used in `components/Downloads.tsx`):

- `/files/resume.pdf`
- `/files/10th-marksheet.pdf`
- `/files/11th-marksheet.pdf`
- `/files/12th-marksheet.pdf`
- `/files/sem1-marksheet.pdf`
- `/files/sem2-marksheet.pdf`

How to use

1. Create the `public/files` directory (already created for you).
2. Copy your PDFs into that directory and make sure filenames match the list above (or edit `components/Downloads.tsx` to change them).

PowerShell example to copy files (adjust source paths):

```powershell
# create folder (if not already created)
New-Item -ItemType Directory -Force .\public\files

# copy files (example, change source paths)
Copy-Item 'C:\Users\You\Downloads\resume.pdf' -Destination '.\public\files\resume.pdf'
Copy-Item 'C:\Users\You\Downloads\10th.pdf' -Destination '.\public\files\10th-marksheet.pdf'
```

Notes

- Vite serves files in `public` at the project root. After running the dev server, `/files/resume.pdf` will be available at `http://localhost:5173/files/resume.pdf` (port may vary).
- If a download link 404s, verify the file exists in `public/files` and the filename matches.
- To change the files or labels shown on the site, edit `components/Downloads.tsx` (the `files` array at the top).