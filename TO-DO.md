# Generate Titan - FINISHED THE "MVP"

### Description

Should generate files in folders, by now it is focus on creating folders for react components, It generate (should) a folder with an index.tsx and styles.ts.

### Checklist

- [x] Check if the config file is created.
- [x] Generate a config file (gentitan.json).
- [x] Get file name.
- [x] Create a Nextjs Page.
- [x] Create a directory with choosen name and with index.tsx and styles.ts.

### Ideas

- Create a folder inside the working dir with custom templates and add on the config file like this:
  ```JSON
  {
    ...
    "custom_templates": PATH,
    "templates": [
      {
        "name": "solidjs-component.mustache",
        "params": ["name", "type"]
      }
    ]
  }
  ```
