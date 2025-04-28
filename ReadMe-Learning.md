`node -v`    --> check node version 

it needs to bigger than 18.00.00

npm comes with node 

if version not enough, download the LTS msi file and do the installation

## Create Vite React

from Vite home page, --> Guide --> Getting Started --> 

`npm create vite@latest`

select 

`TypeScript + SWC`

run

`npm install`

you can launch the app now with

`npm run dev`



On the Launched app page. You hit the 

`F12`

to launch the debug panel

on the debug panel, hit 

`Ctrl + Shift + P`

to get to **the command list box**

if you input 

`Disable JavaScript`

and refresh the page, 

The SPA will no longer work. 



React Application:

index.html  

```
 <body>

    <div id="root"></div>

    <script type="module" src="/src/main.tsx"></script>

 </body>
```

only has one element called "root" and the script file called "main.tsx"

This is the only file in the project root directory, all other code files are in the sub directory "src"

the "main.tsx" in the "src" directory, find the "root" element and "render" one element called 'App'

```
createRoot(document.getElementById('root')!).render(

 <StrictMode>

  <App />

 </StrictMode>,

)
```

index.html + main.tsx   --> render the "App" element

and "App" react component is coming from 

**App.tsx**

This is really the actual starting point for your application and it is in the 'src' sub directory



React uses "declarative programming" as opposed to our normal "imperative programming"



## Install and config tailwindcss

**go to tailwindcss website, Getting Started, Installation, following the instructions from vite tab.**

`npm install tailwindcss @tailwindcss/vite`



**Install "Tailwind CSS IntelliSense" extension to the IDE**

**Install "ESLint" extension to the IDE**



Delete "App.css"   you no longer need
