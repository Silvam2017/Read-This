
    const generateAbout = aboutText => {
      if (!aboutText) {
        return '';
      }
  
      return `
        # ${aboutText}
        `;
      };
      const generateProjects = projectsArr => {
        return `
            ${projectsArr
              .filter(({ feature }) => feature)
              .map(({ name, description, languages, link }) => {
                return `
                    # ${name}
                    # ${languages.join(', ')}
                    # ${description}
                    # ${link}
              `;
              })
              .join('')}
      
            ${projectsArr
              .filter(({ feature }) => !feature)
              .map(({ name, description, languages, link }) => {
                return `
                    # ${name}
                    # ${languages.join(', ')}
                    # ${description}
                    # ${link}
              `;
              })
              .join('')}
        `;
      };
    module.exports = templateData => {
      // destructure page data by section
      const { projects, about, ...header } = templateData;
      return `
        # ${header.name}
        # ${header.github}
        # ${generateAbout(about)}
        # ${generateProjects(projects)}
        # ${new Date().getFullYear()}
        # ${header.name}
      `;
    };
    module.exports = generatePage;