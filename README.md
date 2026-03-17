# Proyecto Aplicación Híbrida – Aplicaciones Móviles

**Materia**: Aplicaciones Móviles

**Equipo**: Mariana Urrego, Juanita Correa, Carolina Vargas

---

## Idea

LukApp es una aplicación pensada especialmente para estudiantes universitarios que buscan llevar el control de sus gastos de forma sencilla, rápida y sin depender de bancos o plataformas complejas. Su propósito es ayudar a los estudiantes a visualizar en qué están gastando su dinero, fomentar hábitos financieros responsables y facilitar la toma de decisiones en su vida diaria. Con una interfaz amigable y enfocada en lo esencial, LukApp convierte el registro de gastos en una tarea fácil, útil y accesible para todos.

---

## Descripción del proyecto

Esta es una **aplicación web híbrida** desarrollada con **React**, **Vite** y **Sass**. Permite navegar entre distintas vistas y comportarse con estilo modular y responsive.

---

## Tecnologías utilizadas

- [React](https://reactjs.org/) (library front-end)

- [Vite](https://vitejs.dev/) (bundler)

- [Sass](https://sass-lang.com/) para estilos modulares y escalables

- Git / GitHub para control de versiones

---

## Estructura del proyecto

```
Link figma: https://www.figma.com/design/CBk2SBapWU80EGwZeJSQRC/Diseño-app-hibrída?node-id=0-1&p=f&t=stQ2IyQys74jzvG0-0

```

---

## Instalación

Clona este repositorio y entra al directorio del proyecto:

```bash

git  clone  https://github.com/marianaUrrego/app_hibrida.git

cd  app_hibrida

```

Instala dependencias:

```bash

npm  install

```

Inicia el servidor de desarrollo:

```bash

npm  run  dev

```

Abre `http://localhost:5173` en tu navegador para visualizar la app.

---

## Estilos con Sass

- Usamos **Sass modular**: archivos separados por función, diseño, componentes y páginas.

- Los **componentes React** tienen estilos locales con **CSS Modules** (`*.module.scss`) para evitar conflictos.

- El archivo `styles/main.scss` reúne todo lo global y se importa una sola vez en `main.jsx`.

---

> **Nota**: Este README está creado bajo el contexto académico del curso.
