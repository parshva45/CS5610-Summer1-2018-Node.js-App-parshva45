module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.put('/api/section/:sectionId', updateSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.delete('/api/section/:sectionId', deleteSection);
  app.get('/api/section/:sectionId', getSection);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

  function deleteSection(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel
      .deleteSection(sectionId)
      .then(function () {
        return enrollmentModel
          .removeEnrollmentsForSection(sectionId)
      })
      .then(res.sendStatus(200))
  }

  function updateSection(req, res) {
    var sectionId = req.params['sectionId'];
    var section = req.body;
    sectionModel
      .updateSection(sectionId, section)
      .then(res.sendStatus(200))
  }

  function getSection(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel
      .getSection(sectionId)
      .then(function (section) {
        res.json(section);
      })
  }

};