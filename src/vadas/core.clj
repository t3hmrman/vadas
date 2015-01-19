(ns vadas.core
  (:import (edu.cmu.sphinx.api Configuration)))

(defn start-listening
  "Test CMU Sphinx4 listener"
  []
  (let [config (new Configuration)]
    (println "Created new configuration: " (str config))))

(defn -main
  "VADAS"
  []
  (start-listening))
