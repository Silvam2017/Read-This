//removed generateAbout from module code
const generateProjects = projectsArr => {
  return `
  ${projectsArr
  .filter(({ feature }) => !feature)
  .map(({ name, description, languages, link }) => {
    return `
# Project Name: ${name}

# Project Description: ${description}

# GitHub Repository Link: ${link}

# Languages Used: ${languages.join(', ')}
    `
    })
    .join('')}
    `;
  };

    module.exports = templateData => {
      // destructure page data by section
      const { projects, about, ...header } = templateData;
      return `
## ${generateProjects(projects)}
## ${header.github}
## ${new Date().getFullYear()}
## ${header.name}
      `;
    };