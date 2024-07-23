$(document).ready(function() {
  // Tableaux pour stocker les tâches en cours et terminées
  let currentTasks = [];
  let completedTasks = [];

  // Fonction pour ajouter une tâche à la liste des tâches en cours
  function addTask(taskText) {
    currentTasks.push(taskText);
    updateTaskList();
  }

  // Fonction pour mettre à jour les listes de tâches
  function updateTaskList() {
    $("#taskList").empty();
    $("#tacheFaites").empty();

    // Mettre à jour la liste des tâches en cours
    currentTasks.forEach(function(task, index) {
      const listItem = $("<li>").text(task).attr("data-index", index);

      // Ajouter les événements de balayage
      listItem.on("swiperight", function() {
        completeTask(index);
      });

      listItem.on("swipeleft", function() {
        removeTask(index);
      });

    

    // Mettre à jour la liste des tâches terminées
    completedTasks.forEach(function(task, index) {
      const listItem = $("<li>").text(task).css("text-decoration", "line-through").attr("data-index", index);

      // Ajouter les événements de balayage
      listItem.on("swiperight", function() {
        restoreTask(index);
      });

      listItem.on("swipeleft", function() {
        removeCompletedTask(index);
      });

      $("#tacheFaites").append(listItem);
    });
  }

  // Fonction pour compléter une tâche
  function completeTask(index) {
    const completedTask = currentTasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    updateTaskList();
  }

  // Fonction pour restaurer une tâche complétée
  function restoreTask(index) {
    const restoredTask = completedTasks.splice(index, 1)[0];
    currentTasks.push(restoredTask);
    updateTaskList();
  }

  // Fonction pour supprimer une tâche en cours
  function removeTask(index) {
    currentTasks.splice(index, 1);
    updateTaskList();
  }

  // Fonction pour supprimer une tâche complétée
  function removeCompletedTask(index) {
    completedTasks.splice(index, 1);
    updateTaskList();
  }

  // Fonction pour réinitialiser toutes les tâches
  function resetTasks() {
    currentTasks = [];
    completedTasks = [];
    updateTaskList();
  }

  // Ajouter une tâche lors du clic sur le bouton "Ajouter"
  window.ajouterTache = function() {
    const taskText = $("#task").val().trim();
    if (taskText !== "") {
      addTask(taskText);
      $("#task").val("");
    }
  };

  // Réinitialiser les tâches lors du clic sur le bouton "Réinitialiser"
  window.reinistialiserTache = function() {
    resetTasks();
  };

  // Initialiser la liste des tâches
  updateTaskList();
});
