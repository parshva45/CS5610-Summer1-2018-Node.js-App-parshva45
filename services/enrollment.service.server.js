module.exports = function (app) {

  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.delete('/api/section/:sectionId/enrollment/:enrollmentId', unenrollStudentInSection);
  app.get('/api/student/section', findEnrolledSectionsForStudent);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findEnrolledSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function (enrollments) {
        res.json(enrollments);
      });
  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

  function unenrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var enrollmentId = req.params.enrollmentId;

    sectionModel
      .incrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .unenrollStudentInSection(enrollmentId)
      })
      .then(function () {
        res.sendStatus(200);
      })
  }

};