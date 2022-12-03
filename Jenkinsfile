Pipeline{
    Agent any
	Stages{

    		Stage('SCM checkout') 
    		{
        		url: 'https://github.com/HazemFelhi/doctor-app.git'
    		}

    		Stage('Build and run docker-compose file') 
    		{
        		sh 'docker-compose build'
        		sh 'docker-compose up -d'
    		}

    		Stage('Pushing code to DockerHub')
    		{
        		withCredentials([string(credentialsId: 'dockerhub-doctor-app-hazem', variable: 'HPWD')]) 
        		{
            		sh "docker login -u hazemfelhi -p ${HPWD}"
        		}
        		sh 'docker push hazemfelhi/doctor-app'
    		} 
	}

}
