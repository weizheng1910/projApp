module.exports = (app, allModels) => {
  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const controllerCallbacks = require("./controllers/controller")(allModels);

  app.get("/", controllerCallbacks.home);

  app.get("/user/:id/received", controllerCallbacks.received);
  app.get("/user/:id/given", controllerCallbacks.given);
  app.get("/toggleDone/:id", controllerCallbacks.toggleDone);

  app.get("/user/:userid/editTask/:taskid", controllerCallbacks.editTask);
  app.get("/user/:id/createTask", controllerCallbacks.createTask);
  app.get(
    "/user/:userid/task/:taskid/setRequest",
    controllerCallbacks.setRequest
  );

  app.get(
    "/user/:userid/task/:taskid/editRequest",
    controllerCallbacks.displayEditRequest
  );

  app.get("/user/:userid/projectOverview/", controllerCallbacks.projOverview);

  app.get(
    "/user/:userid/createProject",
    controllerCallbacks.displayProjectForm
  );

  app.get("/logout", controllerCallbacks.logout);

  app.post("/login", controllerCallbacks.submitLogin);
  app.post("/createNewUser", controllerCallbacks.submitNewUser);

  app.post("/user/:userid/createProject", controllerCallbacks.submitNewProject);

  app.post(
    "/user/:userid/task/:taskid/submitRequest",
    controllerCallbacks.submitRequest
  );

  app.post(
    "/user/:userid/task/:taskid/submitEditRequest",
    controllerCallbacks.submitEditRequest
  );

  app.get(
    "/user/:userid/editProj/:boardid",
    controllerCallbacks.displayEditProj
  );

  app.put(
    "/user/:userid/editProject/:boardid",
    controllerCallbacks.submitEditProj
  );

  app.put("/user/:userid/editTask/:taskid", controllerCallbacks.submitEditTask);
  app.put("/createTask", controllerCallbacks.submitCreatedTask);

  app.delete(
    "/user/:userid/deleteTask/:taskid",
    controllerCallbacks.deleteTask
  );
  app.delete(
    "/user/:userid/deleteProj/:boardid",
    controllerCallbacks.deleteProj
  );
};
