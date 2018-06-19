var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function findStudentsForSection(sectionId) {
  return enrollmentModel
      .find({section: sectionId})
      .populate('student')
    .exec();
}

function removeEnrollmentsForSection(sectionId) {
  return enrollmentModel
    .remove({
      section: sectionId
    })
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  findStudentsForSection: findStudentsForSection,
  removeEnrollmentsForSection: removeEnrollmentsForSection
};