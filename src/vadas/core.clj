(ns vadas.core)

(defn start-listening
  "Test CMU Sphinx4 listener"
  []
  (let [config (new edu.cmu.sphinx.api.Configuration)]
    (println "Created new configuration: " (str config))))

(defn -main
  "VADAS"
  []
  (start-listening))
